# Proyecto Animaloteca Fullstack (backend)

## Estructura 
 
 
  ├── config/
   └── config.js/

  ├── controllers/
   └── auth.controller.js/
   └── consejo.controller.js/
   └── protectoras.controller.js/
   └── recetas.controller.js/
   └── ususario.controller.js/
  
  ├── db
   └── models/
     └──consejo.model.js
     └──index.js
     └──protectora.model.js
     └──receta.model.js
     └──usuario.model.js
    └──mongoose.js

  ├── middleware/
   └──auth.middleware.js
   └──erro.middleware.js

  ├── node_modules/

  ├── routes/
   └──index.routes.js


## URL del frontend desplegado

[LINK](https://animaloteca-backend.onrender.com)


## Inicio de proyecto

```bash
npm install
npm run dev
```

## Imágenes

Todas las imágenes del proyecto se encuentra en el repositorio del Frontend, en la carepta public, dentro de la subcarpeta img. Las imágenes están optimizadas 

## .gitignore y .env

se crea un archivo para ignorar el node_modules y la información sensible del .env y se crea un .env.example orientativo.

PORT=3001
DOMAIN=https://animaloteca-backend.onrender.com

DB_USER=tu_usuario_mongo
DB_PASS=tu_contraseña_mongo
CLUSTER=tu_cluster_mongo
DATABASE=animaloteca 

JWT_SECRET=tu_clave_secreta
FRONTEND_URL=https://animaloteca-frontend.vercel.app


