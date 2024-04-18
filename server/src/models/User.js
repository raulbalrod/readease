import mongoose from "mongoose";

const { Schema, model } = mongoose;

const bookCopySchema = new Schema({
  bookRef: { type: Schema.Types.ObjectId, ref: "Book" },
  personalStatus: {
    type: String,
    enum: ["Leyendo", "Futuras lecturas", "Leído"],
    default: "Futuras lecturas",
  },
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Basic", "Premium"], default: "Basic" },
  bookList: [bookCopySchema],
});

export default model("User", userSchema);
