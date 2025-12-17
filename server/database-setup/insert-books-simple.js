#!/usr/bin/env node

// Script simple para insertar libros en ReadEase
// Uso: node insert-books-simple.js

import mongoose from 'mongoose';
import Book from './server/src/models/Book.js';

// Importar el JSON completo desde el archivo
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer el JSON completo
let books;
try {
  const booksData = readFileSync(join(__dirname, 'books-data.json'), 'utf8');
  books = JSON.parse(booksData);
  console.log(`📚 Cargados ${books.length} libros desde books-data.json`);
} catch (error) {
  console.error('❌ Error leyendo books-data.json:', error.message);
  console.log('💡 Asegúrate de que el archivo books-data.json existe y contiene tu JSON completo');
  process.exit(1);
}

// Configuración de MongoDB (usa las mismas variables que tu .env)
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:8080';

async function main() {
  try {
    console.log('🚀 Conectando a MongoDB...');
    await mongoose.connect(MONGODB_URL);
    console.log('✅ Conectado a MongoDB');

    console.log(`📚 Insertando ${books.length} libros...`);
    
    let insertedCount = 0;
    let skippedCount = 0;

    for (const bookData of books) {
      try {
        // Verificar si ya existe
        const existing = await Book.findOne({ title: bookData.title });
        if (existing) {
          console.log(`⚠️  Ya existe: "${bookData.title}"`);
          skippedCount++;
          continue;
        }

        // Insertar libro
        await Book.create(bookData);
        console.log(`✅ Insertado: "${bookData.title}"`);
        insertedCount++;

      } catch (error) {
        console.error(`❌ Error con "${bookData.title}":`, error.message);
      }
    }

    console.log('\n📊 Resumen:');
    console.log(`✅ Insertados: ${insertedCount}`);
    console.log(`⚠️  Omitidos: ${skippedCount}`);
    console.log(`📚 Total: ${books.length}`);

  } catch (error) {
    console.error('💥 Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋 Desconectado');
  }
}

main();
