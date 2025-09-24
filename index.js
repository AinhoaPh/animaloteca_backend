import express from 'express';
import { PORT, DOMAIN } from "./config/config.js";
import cors from 'cors';
import { connectDB } from './db/mongoose.js';
import { router } from './routes/index.routes.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';

const app = express();

// funciones intermedias para modificar req,res


app.use(cors()); // Middleware para permitir solicitudes desde otros dominios (CORS)
app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las solicitudes funcion que se ejecuta en un cicl de vida d nuetsr consulta y podria modificar el req o el res.(procesa cualquier body que este en JSON )
app.use(express.urlencoded({ extended: true })); // Middleware para parsear datos de formularios (application/x-www-form-urlencoded)

app.use("/", express.static("public")); // Middleware para servir archivos estáticos desde la carpeta "public"
//app-use("/endpoint", express.static("carpeta-de-mis-archivos-estaticos")); // Middleware para servir archivos estáticos desde una carpeta específica

// Servir archivos estáticos desde la carpeta "public/landing"
//app.use("/landing", express.static("public/landing")); 
//app.use("/landing")// // Middleware de autenticación para la ruta /landing
 app.get("/", (req, res) => {
   res.status(200).send(`Bienvenido a  <a href="http://localhost:5173">Animaloteca</a> para usar la aplicación</p>
  `);
 });


// app.get("/verlogs", (req, res) => {
//   res.json(logs)
// });

// Importar las rutas desde el archivo de routes utiliza nuestro router para tdds los endpoint que coinciden api/v1/...
app.use("/api/v1", router);

// app.get("/ver.error", (req, res, next) => {
//   try {
//     let num = 3; // Usar let en lugar de const
//     num = 2;
//     res.send("Operación completada");
//   } catch (error) {
//     next(error);
//   }
// });

app.get("/error2", (req, res, next) => {
  const error = new Error("Este es otro error de prueba");
  error.status = 444; // Es una propiedad, no un método
  next(error);
});

// ruta comodin en caso de no haber entrado a ninguna de las anteriores
app.use(notFoundHandler);

app.use(errorHandler); // Middleware para manejar errores tienen "err" como primer parametro app use sin ruta aplicata a todo

// Inicialización asíncrona
const initServer = async () => {
  try {
    await connectDB(); // Esperar a que la conexión se establezca

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en ${DOMAIN}:${PORT}`);
    });
  } catch (error) {
    console.error('Error al inicializar:', error);
    process.exit(1);
  }
};

initServer(); // Iniciar el servidor