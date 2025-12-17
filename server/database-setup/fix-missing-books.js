#!/usr/bin/env node

// Script para insertar los libros faltantes limpiando campos no válidos
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Book from './src/models/Book.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:8080';

// Función para limpiar un libro de campos no válidos
function cleanBook(book) {
  const cleanedBook = { ...book };
  
  // Eliminar campos que no están en el modelo
  delete cleanedBook.status;
  
  // Asegurar que todos los campos requeridos estén presentes
  if (!cleanedBook.title) {
    console.log(`⚠️  Libro sin título: ${JSON.stringify(book).substring(0, 100)}...`);
    return null;
  }
  
  if (!cleanedBook.subtitle) {
    console.log(`⚠️  Libro sin subtítulo: "${cleanedBook.title}"`);
    cleanedBook.subtitle = "";
  }
  
  if (!cleanedBook.description) {
    console.log(`⚠️  Libro sin descripción: "${cleanedBook.title}"`);
    cleanedBook.description = "";
  }
  
  if (!cleanedBook.authors?.name) {
    console.log(`⚠️  Libro sin autor: "${cleanedBook.title}"`);
    return null;
  }
  
  if (!cleanedBook.pageCount) {
    console.log(`⚠️  Libro sin pageCount: "${cleanedBook.title}"`);
    cleanedBook.pageCount = 0;
  }
  
  if (!cleanedBook.image?.frontImage) {
    console.log(`⚠️  Libro sin imagen: "${cleanedBook.title}"`);
    cleanedBook.image = { frontImage: "" };
  }
  
  return cleanedBook;
}

async function fixMissingBooks() {
  try {
    // Leer JSON
    const booksData = readFileSync(join(__dirname, '..', 'books-data.json'), 'utf8');
    const books = JSON.parse(booksData);
    
    console.log('🚀 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URL);
    console.log('✅ Conectado a MongoDB');

    // Obtener títulos existentes
    const existingBooks = await Book.find({}, 'title').lean();
    const existingTitles = new Set(existingBooks.map(book => book.title));
    
    // Encontrar libros faltantes
    const missingBooks = books.filter(book => !existingTitles.has(book.title));
    
    console.log(`📊 Estadísticas:`);
    console.log(`   📚 Libros en JSON: ${books.length}`);
    console.log(`   💾 Libros en BD: ${existingBooks.length}`);
    console.log(`   ❌ Libros faltantes: ${missingBooks.length}`);
    
    if (missingBooks.length === 0) {
      console.log('\n✅ ¡Todos los libros ya están en la base de datos!');
      return;
    }
    
    console.log(`\n🧹 Limpiando libros faltantes...`);
    const cleanedBooks = [];
    
    for (const book of missingBooks) {
      console.log(`🔧 Procesando: "${book.title}"`);
      const cleaned = cleanBook(book);
      if (cleaned) {
        cleanedBooks.push(cleaned);
        console.log(`   ✅ Limpiado: "${cleaned.title}"`);
      } else {
        console.log(`   ❌ No se pudo limpiar: "${book.title}"`);
      }
    }
    
    if (cleanedBooks.length > 0) {
      console.log(`\n🚀 Insertando ${cleanedBooks.length} libros limpios...`);
      
      // Insertar uno por uno para ver errores específicos
      let insertedCount = 0;
      for (const book of cleanedBooks) {
        try {
          await Book.create(book);
          console.log(`   ✅ Insertado: "${book.title}"`);
          insertedCount++;
        } catch (error) {
          console.log(`   ❌ Error insertando "${book.title}": ${error.message}`);
        }
      }
      
      console.log(`\n🎉 Resultado:`);
      console.log(`   ✅ Insertados exitosamente: ${insertedCount}`);
      console.log(`   ❌ Errores: ${cleanedBooks.length - insertedCount}`);
      
      // Verificar total final
      const finalCount = await Book.countDocuments();
      console.log(`   📚 Total final en BD: ${finalCount}`);
    }

  } catch (error) {
    console.error('💥 Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
  }
}

fixMissingBooks();
