import mongoose from 'mongoose';

const  { Schema, model } =  mongoose;

const bookSchema = new Schema({
  title: { type: String, required: true, unique: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  categories: { type: Array },
  rating: { type: Number, min: 0, max: 5, default: 0 },
  status: { type: String, enum: ['Leyendo', 'Futuras lecturas', 'Leído'], default: 'Futuras lecturas' },
  image: {
    frontImage: { type: String, required: true },
  },
  authors: {
    name: { type: String, required: true },
    img: { type: String },
    biography: { type: String },
  },
  editorial: { type: String },
  pageCount: { type: Number, min: 0, required: true },
  ebook: { type: String },
  audiobook: { type: String }
});

export default model('Book', bookSchema);
