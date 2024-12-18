import express from "express"
import dotenv from 'dotenv'
import { connectDB } from "./config/db"
import projectRoutes from './routes/projectRoutes'

dotenv.config() // hacemos que pueda tomar las variables de entorno
connectDB()
const app = express() 
app.use(express.json()) // hacer que acepte el formato json para las peticiones

// routes
app.use('/api/projects', projectRoutes)


export default app