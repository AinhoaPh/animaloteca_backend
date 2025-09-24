import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DOMAIN = process.env.DOMAIN || "http://localhost";

export const DB_USER = process.env.DB_USER || "user-falso";
export const DB_PASS = process.env.DB_PASS || "1234";
export const CLUSTER = process.env.CLUSTER || "cluster.mongodb.net";
export const DATABASE = process.env.DATABASE ||"database"; // ← nombre de la base de datos

export const JWT_SECRET = process.env.JWT_SECRET || "clave-supersecreta";
