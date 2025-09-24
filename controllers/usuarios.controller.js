import { Usuario} from '../db/models/index.js';

//Objeto modelo para nuestras respuestas
const ResponseAPI = {
  data:[],
  msg:"",
  status:"ok"
}
// logica de prog

export const getUsuarios = async (req, res, next) => {
  try{

    // traer los datos de la coleccion
    const users = await Usuario.find();

    console.log("Obteniendo todos los usuarios");
    //OPcion1
    // res.status(200).json({
    //     msg:"Usuarios obtenidos",
    //     data: users
    // })

    //Opcion2
    ResponseAPI.msg="Usuarios obtenidos";
    ResponseAPI.data = users;
    res.status(200).json(ResponseAPI)
  }catch(e){
    next(e); 
  }
  
}

export const getUsuariosById = async (req, res, next) => {
  try{
    const { uid } = req.params;
    // traer los datos de la coleccion
    const user = await Usuario.findById(uid);
    console.log("Obteniendo usuario por id:", uid);
    if(!user) {
      //  res.status(404).json({ msg:"Usuario no encontrada"});
      ResponseAPI.msg = "Usuario no encontrado";
      ResponseAPI.data = [];
      ResponseAPI.status = "error";
     res.status(404).json(ResponseAPI);
    }
  
        ResponseAPI.msg="Usuario encontrado"
        ResponseAPI.data = user;
    res.status(200).json(ResponseAPI);
  }catch(e){
    next(e); 
  }

}

export const createUsuario = async (req, res, next) => {
  try{

    
    const { name, email, username } = req.body;
    const newUser = new Usuario({
      name: name,
      username: username,
      email: email
    });
    const usuarioCreado = await newUser.save();
    
    
      console.log("Usuario creado:", usuarioCreado);


    ResponseAPI.msg="Usuario creado correctamente";
    ResponseAPI.data = usuarioCreado;
    ResponseAPI.status = "ok";
res.status(200).json(ResponseAPI);

  }catch(e){
    next(e);
  }
}


// Actualizar usuario
export const updateUser = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const updateData = req.body;

    const updatedUser = await Usuario.findByIdAndUpdate(uid, updateData, { new: true });

    if (!updatedUser) {
      ResponseAPI.msg = "Usuario no encontrado";
      ResponseAPI.data = [];
      ResponseAPI.status = "error";
      return res.status(404).json(ResponseAPI);
    }

    ResponseAPI.msg = "Usuario actualizado correctamente";
    ResponseAPI.data = updatedUser;
    ResponseAPI.status = "ok";
    res.status(200).json(ResponseAPI);
  } catch (e) {
    next(e);
  }
};

// Eliminar usuario
export const deleteUsuario = async (req, res, next) => {
  try {
    const { uid } = req.params;
    const deletedUser = await Usuario.findByIdAndDelete(uid);

    if (!deletedUser) {
      ResponseAPI.msg = "Usuario no encontrado";
      ResponseAPI.data = [];
      ResponseAPI.status = "error";
      return res.status(404).json(ResponseAPI);
    }

    ResponseAPI.msg = `Usuario con id ${uid} eliminado correctamente`;
    ResponseAPI.data = deletedUser;
    ResponseAPI.status = "ok";
    res.status(200).json(ResponseAPI);
  } catch (e) {
    next(e);
  }
};


