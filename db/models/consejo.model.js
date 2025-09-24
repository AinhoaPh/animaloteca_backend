// models/Consejo.js
import mongoose from "mongoose";

const consejoSchema = new mongoose.Schema({
  titulo: String,
  imagen: String, 
  contenido: [String] // Lista de pasos o ideas
}, {
  collection: "consejo",
  strict: true,
  collation: { locale: "es", strength: 1 }
});

export const Consejo = mongoose.model("Consejo", consejoSchema);