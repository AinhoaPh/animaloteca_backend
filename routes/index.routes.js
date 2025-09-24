import { Router } from "express";
import { loginUser, registerUser, getCurrentUser } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

import { getProtectoras, getProtectorasById, createProtectora, updateProtect, deleteProtectora } from "../controllers/protectoras.controller.js";
import { createUsuario, deleteUsuario, getUsuarios, getUsuariosById, updateUser } from "../controllers/usuarios.controller.js";
import { getRecetas } from "../controllers/recetas.controller.js";
import { getConsejos } from "../controllers/consejo.controller.js";
export const router = Router();

// Ruta pública de prueba
router.get("/public", (req, res) => {
  res.send("Ruta pública funcionando correctamente");
});

// Rutas de autenticación

router.post("/auth/login", loginUser)

router.post("/auth/register", registerUser)

router.get("/auth/me",authMiddleware, getCurrentUser)

router.get("/protected",authMiddleware, (req, res) => {
  res.json({

    msg:"Ruta protegida pudiste acceder con tu token válido"});
});


// Rutas CRUD de usuarios

// Obtener todos los usuarios
router.get("/usuarios", getUsuarios);

// Obtener un usuario por ID
router.get("/usuarios/:uid", getUsuariosById);

// Crear un nuevo usuario
router.post("/usuarios", createUsuario);

// Actualizar usuario por ID
router.put("/usuarios/:uid", updateUser);

// Eliminar usuario por ID
router.delete("/usuarios/:uid", deleteUsuario);



// Rutas CRUD de protectoras

// Obtener todos los protectoras
router.get("/protectoras", getProtectoras);

// Obtener un protectoras por ID
router.get("/protectoras/:uid", getProtectorasById);

// Crear un nuevo protectoras
router.post("/protectoras", createProtectora);

// Actualizar protectoras por ID
router.put("/protectoras/:uid", updateProtect);

// Eliminar protectoras por ID
router.delete("/protectoras/:uid", deleteProtectora);




// Rutas CRUD de recetas

router.get("/recetas", getRecetas)

router.get("/consejos", getConsejos)