#!/usr/bin/env node

// Script para verificar qué libros faltan en la BD
import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Book from './src/models/Book.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://raulbalrod_db_user:emR0gZsXOXsL3PjA@readease-project.afa7bgy.mongodb.net/readease?retryWrites=true&w=majority';

async function checkMissingBooks() {
  try {
    // Leer JSON
    const booksData = readFileSync(join(__dirname, '..', 'books-data.json'), 'utf8');
    const books = JSON.parse(booksData);
    
    console.log('🚀 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URL);
    console.log('✅ Conectado a MongoDB');

    // Obtener todos los títulos de la BD
    const existingBooks = await Book.find({}, 'title').lean();
    const existingTitles = new Set(existingBooks.map(book => book.title));
    
    console.log(`📊 Estadísticas:`);
    console.log(`   📚 Libros en JSON: ${books.length}`);
    console.log(`   💾 Libros en BD: ${existingBooks.length}`);
    
    // Encontrar libros faltantes
    const missingBooks = books.filter(book => !existingTitles.has(book.title));
    
    if (missingBooks.length > 0) {
      console.log(`\n❌ Libros faltantes (${missingBooks.length}):`);
      missingBooks.forEach((book, index) => {
        console.log(`   ${index + 1}. "${book.title}" - ${book.authors.name}`);
      });
      
      // Verificar si hay problemas con los datos
      console.log(`\n🔍 Analizando problemas potenciales:`);
      missingBooks.forEach((book, index) => {
        const issues = [];
        
        if (!book.title) issues.push('Sin título');
        if (!book.subtitle) issues.push('Sin subtítulo');
        if (!book.description) issues.push('Sin descripción');
        if (!book.authors?.name) issues.push('Sin autor');
        if (!book.pageCount) issues.push('Sin pageCount');
        if (!book.image?.frontImage) issues.push('Sin imagen');
        
        if (issues.length > 0) {
          console.log(`   ❌ "${book.title}": ${issues.join(', ')}`);
        }
      });
    } else {
      console.log('\n✅ ¡Todos los libros están en la base de datos!');
    }
    
    // Verificar duplicados en el JSON
    const titleCounts = {};
    books.forEach(book => {
      titleCounts[book.title] = (titleCounts[book.title] || 0) + 1;
    });
    
    const duplicates = Object.entries(titleCounts).filter(([title, count]) => count > 1);
    if (duplicates.length > 0) {
      console.log(`\n⚠️  Duplicados en JSON (${duplicates.length}):`);
      duplicates.forEach(([title, count]) => {
        console.log(`   🔄 "${title}" aparece ${count} veces`);
      });
    }

  } catch (error) {
    console.error('💥 Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n👋 Desconectado de MongoDB');
  }
}

checkMissingBooks();
