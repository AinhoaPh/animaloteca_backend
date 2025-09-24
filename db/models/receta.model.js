import mongoose from 'mongoose';


// Esquema para reutilzar modelos -> "https://mongoosejs.com/docs/api/model.html"

const options = {
 collection: 'recetas', // nombre archivo de bas de datos 
 strict: true, // Habilita el modo estricto para el esquema solo permite guardar los campos definidos en el esquema
 collation: {
    locale:"es", // config para idioma 
    strength: 1 // Nivel que va ausar cuando se comparen los campos de texto, 1 ignoraa mayúsculas y minúsculas y tildes
 }
}

// Esquema de nuetsro modelo en Mongoose
// Pueden ver los tipos :(String, Number, Boolean, Date, Array, ObjectId, etc.)
// mongoosejs.com/docs
const recetaSchema = new mongoose.Schema({
    titulo: String,
    imagen: String,
    animal: String, 
    tiempo: Number,
    ingredientes: [String],
    preparacion: [String],
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }
}, options);

// Exportamos el modelo para poder usarlo en otras partes de la aplicación creamos un modelo llamado Receta
export const Receta = mongoose.model("Receta", recetaSchema);
