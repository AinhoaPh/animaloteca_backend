import { Receta } from '../db/models/index.js';


//Objeto modelo para nuestras respuestas
const ResponseAPI = {
  data:[],
  msg:"",
  status:"ok"
}
// logica de prog

export const getRecetas = async (req, res, next) => {
  try{
  

    const { titulo, animal } = req.query;

    // Crear un objeto de consulta vacío
    const query = {};
   

    // Añadir filtros si existen

    if (animal) query.animal = animal;
    if (titulo) query.titulo = new RegExp(titulo, "i");
    
    console.log("Query recibido:", query);
   
    const recetas = await Receta.find(query);

    console.log("Obteniendo todas las Recetas");



    ResponseAPI.msg="Recetas obtenidos";
    ResponseAPI.data = recetas;
    ResponseAPI.status = "ok";

    res.status(200).json(ResponseAPI)
  }catch(e){
    next(e); 
  }
  
}

// export const getProtectorasById = async (req, res, next) => {
//   try{
//     const { uid } = req.params;
//     // traer los datos de la coleccion
//     const protectoras = await Protectora.findById(uid);
//     console.log("Obteniendo protectora por id:", uid);
//     if(!protectoras) {
//       //  res.status(404).json({ msg:"Protectora no encontrada"});
//       ResponseAPI.msg = "Protectora no encontrada";
//       ResponseAPI.data = [];
//       ResponseAPI.status = "error";
//      res.status(404).json(ResponseAPI);
//     }
  
//         ResponseAPI.msg="Protectora encontrada"
//         ResponseAPI.data = protectoras;
//     res.status(200).json(ResponseAPI);
//   }catch(e){
//     next(e); 
//   }

// }

// export const createProtectora = async (req, res, next) => {
//   try{

//     const { comunidad, categoria, nombre, descripcion, direccion, telefono, web } = req.body;
//     const newProtectora = new Protectora({
//       comunidad: comunidad,
//       categoria: categoria,
//       nombre: nombre,
//       descripcion: descripcion,
//       direccion: direccion,
//       telefono: telefono,
//       web: web
//     });

//     const ProtectoraCreada = await newProtectora.save(); 
//     console.log("Protectora creada:", ProtectoraCreada);

//     ResponseAPI.msg="Protectora creada correctamente";
//     ResponseAPI.data = newProtectora;
//     ResponseAPI.status = "ok";
// res.status(200).json(ResponseAPI);

//   }catch(e){
//     next(e);
//   }
// }


// // Actualizar Protectora
// export const updateProtect = async (req, res, next) => {
//   try {
//     const { uid } = req.params;
//     const updateData = req.body;

//     const updatedProtect = await Protectora.findByIdAndUpdate(uid, updateData, { new: true });

//     if (!updatedProtect) {
//       ResponseAPI.msg = "Protectora no encontrada";
//       ResponseAPI.data = [];
//       ResponseAPI.status = "error";
//       return res.status(404).json(ResponseAPI);
//     }

//     ResponseAPI.msg = "Protectora actualizada correctamente";
//     ResponseAPI.data = updatedProtect;
//     ResponseAPI.status = "ok";
//     res.status(200).json(ResponseAPI);
//   } catch (e) {
//     next(e);
//   }
// };

// // Eliminar Protectora
// export const deleteProtectora = async (req, res, next) => {
//   try {
//     const { uid } = req.params;
//     const deletedProtect = await Protectora.findByIdAndDelete(uid);

//     if (!deletedProtect ) {
//       ResponseAPI.msg = "Protectora no encontrada";
//       ResponseAPI.data = [];
//       ResponseAPI.status = "error";
//       return res.status(404).json(ResponseAPI);
//     }

//     ResponseAPI.msg = `Protectora con id ${uid} eliminada correctamente`;
//     ResponseAPI.data = deletedProtect ;
//     ResponseAPI.status = "ok";
//     res.status(200).json(ResponseAPI);
//   } catch (e) {
//     next(e);
//   }
// };


