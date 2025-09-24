import { JWT_SECRET } from "../config/config.js"; // Importar la clave secreta para verificar el token
import jwt from 'jsonwebtoken'; // Importar la librería jsonwebtoken para manejar JWT

// 
export const authMiddleware = (req, res, next) => {
    try {
 
        // Verificar si el token está presente en los encabezados de la solicitud
        const token = req.header('Authorization')?.replace("Bearer ", ""); // 
        //console.log(token)
        // el token del encabezado Authorization
        if (!token) {
            return res.status(401).json({ msg: "No autorizado, falta el token" });
        }

        // Verificar si el token es válido
        // Aquí puedes usar una librería como jsonwebtoken para verificar el token
        const payload = jwt.verify(token, JWT_SECRET); // Verificar el token con la clave secreta
        console.log(payload);

        // Si el token es válido, puedes agregar los datos del usuario al objeto req
        req.userId = payload.userId; // Aquí puedes agregar más datos si es necesario 
        req.role = payload.role || "user"; // Agregar el rol del usuario al objeto req


        next(); // Llamar al siguiente middleware o ruta

    } catch (e) {
        res.status(401).json({
            msg: "No autorizado",
            error: e.message
        });

    }


}