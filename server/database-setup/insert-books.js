#!/usr/bin/env node

// Script para insertar libros en ReadEase
// Uso: node insert-books.js

import mongoose from 'mongoose';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import Book from './server/src/models/Book.js';
import config from './server/src/config.js';

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Leer datos de libros desde JSON
let books;
try {
  const booksData = readFileSync(join(__dirname, 'books-data.json'), 'utf8');
  books = JSON.parse(booksData);
  console.log(`📚 Cargados ${books.length} libros desde books-data.json`);
} catch (error) {
  console.error('❌ Error leyendo books-data.json:', error.message);
  console.log('💡 Usando datos de ejemplo...');
  
  // Datos de ejemplo si no se encuentra el archivo
  books = [
    {
      "title": "Hábitos Atómicos",
      "subtitle": "Pequeños Cambios, Resultados Extraordinarios",
      "description": "Una exploración profunda sobre cómo los pequeños cambios diarios pueden llevar a resultados extraordinarios a lo largo del tiempo.",
      "categories": ["Desarrollo Personal", "Psicología"],
      "rating": 4.8,
      "image": {
        "frontImage": "https://m.media-amazon.com/images/I/71prwdyuE7L._SL1500_.jpg"
      },
      "authors": {
        "name": "James Clear",
        "img": "https://m.media-amazon.com/images/S/amzn-author-media-prod/rec58e62v0epfogin4i1o6mu55._SY600_.jpg",
        "biography": "James Clear es un escritor y conferencista reconocido internacionalmente."
      },
      "editorial": "Diana",
      "pageCount": 336,
      "ebook": "https://raw.githack.com/bookbudy/books/main/ebooks/Habitos-atomicos-James-Clear.epub",
      "audiobook": "https://raw.githack.com/bookbudy/books/main/audiobooks/Habitos-atomicos.mp3"
    }
  ];
}

// Función para conectar a MongoDB
async function connectDB() {
  try {
    await mongoose.connect(config.database.url);
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error.message);
    process.exit(1);
  }
}

// Función para insertar libros
async function insertBooks() {
  try {
    console.log('📚 Iniciando inserción de libros...');
    
    // Limpiar colección existente (opcional)
    const existingCount = await Book.countDocuments();
    console.log(`📖 Libros existentes en BD: ${existingCount}`);
    
    let insertedCount = 0;
    let skippedCount = 0;
    
    for (const bookData of books) {
      try {
        // Verificar si el libro ya existe
        const existingBook = await Book.findOne({ title: bookData.title });
        
        if (existingBook) {
          console.log(`⚠️  Libro ya existe: "${bookData.title}"`);
          skippedCount++;
          continue;
        }
        
        // Crear nuevo libro
        const book = new Book(bookData);
        await book.save();
        
        console.log(`✅ Insertado: "${bookData.title}"`);
        insertedCount++;
        
      } catch (error) {
        console.error(`❌ Error insertando "${bookData.title}":`, error.message);
      }
    }
    
    console.log('\n📊 Resumen:');
    console.log(`✅ Libros insertados: ${insertedCount}`);
    console.log(`⚠️  Libros omitidos (ya existían): ${skippedCount}`);
    console.log(`📚 Total procesados: ${books.length}`);
    
  } catch (error) {
    console.error('❌ Error en inserción:', error.message);
  }
}

// Función principal
async function main() {
  console.log('🚀 Script de inserción de libros ReadEase');
  console.log('==========================================\n');
  
  await connectDB();
  await insertBooks();
  
  console.log('\n🎉 ¡Proceso completado!');
  await mongoose.disconnect();
  console.log('👋 Desconectado de MongoDB');
}

// Ejecutar script
main().catch(error => {
  console.error('💥 Error fatal:', error);
  process.exit(1);
});
