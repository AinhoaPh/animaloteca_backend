import mongoose from 'mongoose';


// Esquema para reutilzar modelos -> "https://mongoosejs.com/docs/api/model.html"

const options = {
 collection: 'users', // nombre archivo de bas de datos 
 strict: true, // Habilita el modo estricto para el esquema solo permite guardar los campos definidos en el esquema
 collation: {
    locale:"es", // config para idioma 
    strength: 1 // Nivel que va ausar cuando se comparen los campos de texto, 1 ignoraa mayúsculas y minúsculas y tildes
 }
}

// Esquema de nuetsro modelo en Mongoose
// Pueden ver los tipos :(String, Number, Boolean, Date, Array, ObjectId, etc.)
// mongoosejs.com/docs
const usuarioSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    recetas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Receta' }],
    protectoras: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Protectora' }],
    consejos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Consejo' }]
  }, options);

// Exportamos el modelo para poder usarlo en otras partes de la aplicación creamos un modelo llamado Usuario
export const Usuario = mongoose.model("Usuario", usuarioSchema);
