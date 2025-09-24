import {Usuario} from "../db/models/index.js"; // importar el modelo de usuario
import bcrypt from "bcrypt"; // importar bcrypt para encriptar contraseñas
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";


   const ResponseAPI= {
    msg:"", satus:"ok", data:{}
   }
   
   
   export const registerUser = async( req,res,next) => {
        try{
            // traer datos del body
            const {email, password, name} = req.body;


            // verificar si el user existe
            const existingUser = await Usuario.findOne({email})// se manda el atributo con el valor porque es el midmo
            if(existingUser){
                return res.status(400).json({
                    msg:"El correo ingresado no es valido"
                })
            }

            // Verificar password:
            const salt = await bcrypt.genSalt(10); // generar un salt para hashear el password
            const hashedPassword = await bcrypt.hash(password, salt); // hashear el password con bcrypt


            // Crear nuetsro user 
            const newUser = new Usuario({
                email,
                password: hashedPassword, // aqui se guarda el hash
                name
            })
            
            await newUser.save() // guardar en la base de datos



            // Crear un token JWT

            const token = jwt.sign({
                userId: newUser._id,// mongoose devuelve un id con "_"
                name: newUser.name,
                role:"admin" // puedes agregar más datos si es necesario
            }, 
                JWT_SECRET, // clave secreta del JWT
                {expiresIn: "2h"} // tiempo de expiración del token
            );

            // devolver los datos del usuario + el token JWT

            ResponseAPI.msg = "Usuario registrado correctamente";
         
            // para no mandar el password 
            ResponseAPI.data = {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                token: token
            };

          

            return res.status(200).json(ResponseAPI)
        }
            catch(e){
                next(e)
            }
        }
    
        
    export const loginUser  = async( req,res,next) => {
        try{
            // traer datos del body
            const {email, password} = req.body;
            // verificar si el user existe
            
            const existingUser = await Usuario.findOne({email})// se 
            if (!existingUser) {
                return res.status(404).json({
                    msg: "Usuario con ese correo no existe, por favor regístrate"
                });
            }
            // verificar si el password es correcto

            // traeme de la base de datos con el email  
        // manda el atributo con el valor porque es el midmo
            // verificar si el password es correcto
            //const hashedPassword = await bcrypt.hash(password, 10); // hashear el password con bcrypt
            //  if(password != existingUser.password){
            //     return res.status(401).json({
            //         msg:"Contraseña incorrecta"
            //     })
            //  }

            // comparar el password ingresado con el password hasheado en la base de datos
            const isMatch = await bcrypt.compare(password, existingUser.password); // comparar el password ingresado con el password hasheado en la base de datos

            // si no es correcto
            if(!isMatch){
                return res.status(401).json({
                    msg:"Usuario o Contraseña incorrecta"
                })
            }
            // crear un token
            const token = jwt.sign({
                userId: existingUser._id,// mongoose devuelve un id con "_"
                name: existingUser.name,
                role:"admin"
            }, 
                JWT_SECRET, // clave secreta del JWT
                {expiresIn: "2h"} // tiempo de expiración del token
            );
            // devolver datos 
            ResponseAPI.msg = "Usuario registrado correctamente";
         
            ResponseAPI.data = {
                id: existingUser._id,
                name: existingUser.name,
                email: existingUser.email,
                token: token
            };

          

            return res.status(200).json(ResponseAPI)

           
        }
            catch(e){
                next(e)
            }
        }
    
        
    export const getCurrentUser  = async( req,res,next) => {
        try{
            // obtener el usuario actual desde el token
            const userId = req.userId; // el middleware de auth ya lo extrajo del token


            // traer datos de la base de datos menos el password

            const user = await Usuario.findById(userId).select('-password'); // no queremos devolver el password
            if(!user){
                return res.status(404).json({
                    msg:"Usuario no encontrado"
                })
            }
            ResponseAPI.msg = "Usuario encontrado";
            ResponseAPI.data = user;

            // devolver datos al usuario 
            return res.status(200).json(ResponseAPI)
        }
            catch(e){
                next(e)
            }
        }
    
        