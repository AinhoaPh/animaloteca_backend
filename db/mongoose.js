import mongoose from 'mongoose';
import { DB_USER, DB_PASS, CLUSTER, DATABASE } from "../config/config.js";

export const connectDB = async () => {
    const url = `mongodb+srv://${DB_USER}:${DB_PASS}@${CLUSTER}/${DATABASE}`;
    console.log(url)
    try {
        await mongoose.connect(url);
        console.log("Conexión a la base de datos exitosa Mongodb Atlas:", mongoose.connection.db.databaseName);
            
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Colecciones disponibles:", collections.map(c => c.name));

    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        process.exit(1); // Terminar el proceso si no se puede conectar
    }
}