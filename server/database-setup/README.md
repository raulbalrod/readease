# 📚 Database Setup - ReadEase

Esta carpeta contiene todos los scripts y datos necesarios para configurar la base de datos de ReadEase con los libros iniciales.

## 📁 Archivos incluidos:

### 📊 **Datos**
- `books-data.json` - JSON con 100 libros completos para insertar en la base de datos

### 🚀 **Scripts de inserción**
- `insert-books-bulk.js` - **Script principal** para inserción masiva (RECOMENDADO)
- `insert-books-simple.js` - Script simple para inserción uno por uno
- `insert-books.js` - Script original con lectura de archivo JSON

### 🔧 **Scripts de utilidad**
- `check-missing-books.js` - Verifica qué libros faltan en la base de datos
- `fix-missing-books.js` - Limpia e inserta libros con problemas de formato

## 🎯 **Uso recomendado:**

### Para insertar todos los libros:
Primero crear el archivo `server/databese-setup/books-data.json`

```bash
cd server
export $(cat .env | xargs)
node database-setup/insert-books-bulk.js
```

### Para verificar libros faltantes:
```bash
cd server
export $(cat .env | xargs)
node database-setup/check-missing-books.js
```

### Para limpiar la base de datos (¡CUIDADO!):
```bash
cd server
export $(cat .env | xargs)
node database-setup/insert-books-bulk.js --clear
```

## ⚠️ **Requisitos:**

1. **MongoDB configurado** - Variables de entorno en `.env`
2. **Dependencias instaladas** - `npm install` en la carpeta `server`
3. **Conexión a internet** - Para conectar a MongoDB Atlas

## 📊 **Estadísticas de los datos:**

- **Total de libros**: 100
- **Categorías**: Desarrollo Personal, Psicología, Historia, Filosofía, Ficción, etc.
- **Formatos**: Incluye ebooks y audiolibros
- **Metadatos completos**: Título, autor, descripción, imagen, editorial, etc.

## 🎉 **Estado actual:**

✅ **Completado** - Todos los 100 libros han sido insertados exitosamente en la base de datos.

---

*Estos scripts fueron utilizados para la configuración inicial de la base de datos y pueden ser reutilizados si necesitas restaurar o migrar los datos.*
