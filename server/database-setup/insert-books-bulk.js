#!/usr/bin/env node

// Script para insertar libros en BULK en ReadEase
// Uso: node insert-books-bulk.js

import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Book from './src/models/Book.js';

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de MongoDB
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://raulbalrod_db_user:emR0gZsXOXsL3PjA@readease-project.afa7bgy.mongodb.net/readease?retryWrites=true&w=majority';

// Leer el JSON completo (está en la carpeta padre)
let books;
try {
  const booksData = readFileSync(join(__dirname, '..', 'books-data.json'), 'utf8');
  books = JSON.parse(booksData);
  console.log(`📚 Cargados ${books.length} libros desde books-data.json`);
} catch (error) {
  console.error('❌ Error leyendo books-data.json:', error.message);
  console.log('💡 Asegúrate de que el archivo books-data.json existe en la carpeta raíz');
  process.exit(1);
}

async function insertBooksInBulk() {
  try {
    console.log('🚀 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URL);
    console.log('✅ Conectado a MongoDB');

    // Verificar cuántos libros ya existen
    const existingCount = await Book.countDocuments();
    console.log(`📖 Libros existentes en BD: ${existingCount}`);

    // Filtrar libros que no existen (por título)
    console.log('🔍 Verificando libros existentes...');
    const existingTitles = await Book.find({}, 'title').lean();
    const existingTitleSet = new Set(existingTitles.map(book => book.title));
    
    const newBooks = books.filter(book => !existingTitleSet.has(book.title));
    const duplicateCount = books.length - newBooks.length;

    console.log(`📊 Análisis:`);
    console.log(`   📚 Total en JSON: ${books.length}`);
    console.log(`   ⚠️  Ya existen: ${duplicateCount}`);
    console.log(`   ✨ Nuevos a insertar: ${newBooks.length}`);

    if (newBooks.length === 0) {
      console.log('🎉 ¡Todos los libros ya están en la base de datos!');
      return;
    }

    // Insertar en bulk (mucho más rápido)
    console.log(`🚀 Insertando ${newBooks.length} libros en bulk...`);
    const startTime = Date.now();
    
    const result = await Book.insertMany(newBooks, { 
      ordered: false, // Continúa aunque haya errores
      rawResult: true 
    });
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);

    console.log('\n🎉 ¡Inserción completada!');
    console.log(`✅ Libros insertados: ${result.insertedCount || newBooks.length}`);
    console.log(`⏱️  Tiempo: ${duration} segundos`);
    console.log(`🚀 Velocidad: ${(newBooks.length / parseFloat(duration)).toFixed(1)} libros/segundo`);

    // Verificar total final
    const finalCount = await Book.countDocuments();
    console.log(`📚 Total de libros en BD: ${finalCount}`);

    // Mostrar algunos ejemplos insertados
    console.log('\n📖 Algunos libros insertados:');
    const sampleBooks = await Book.find({}).limit(5).select('title authors.name');
    sampleBooks.forEach(book => {
      console.log(`   📚 "${book.title}" - ${book.authors.name}`);
    });

  } catch (error) {
    console.error('💥 Error durante la inserción:', error.message);
    
    // Si es un error de duplicados, mostrar detalles
    if (error.code === 11000) {
      console.log('⚠️  Algunos libros ya existían (duplicados)');
    }
  } finally {
    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
  }
}

// Función para limpiar la colección (CUIDADO!)
async function clearAllBooks() {
  try {
    console.log('⚠️  ADVERTENCIA: Esto eliminará TODOS los libros de la base de datos');
    console.log('🚀 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URL);
    
    const count = await Book.countDocuments();
    console.log(`📚 Libros a eliminar: ${count}`);
    
    await Book.deleteMany({});
    console.log('🗑️  Todos los libros eliminados');
    
  } catch (error) {
    console.error('💥 Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Desconectado de MongoDB');
  }
}

// Función principal
async function main() {
  const args = process.argv.slice(2);
  
  console.log('📚 Script de inserción BULK - ReadEase');
  console.log('=====================================\n');

  if (args.includes('--clear')) {
    console.log('🗑️  Modo: LIMPIAR base de datos');
    await clearAllBooks();
  } else {
    console.log('📥 Modo: INSERTAR libros');
    await insertBooksInBulk();
  }
}

main().catch(error => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});
