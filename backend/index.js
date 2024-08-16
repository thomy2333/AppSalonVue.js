import express from "express"
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'
import { db } from "./config/db.js"
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/AuthRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import userRoutes from './routes/userRoutes.js'

//variables de entorno
dotenv.config()

//Configurar la app
const app = express()

//Leer datos via body
app.use(express.json())

//conoectar a la base de datos
db()

//configurar cors
const whitelist = [process.env.FRONTEND_URL, undefined]

const corsOptions = {
    origin: function(origin, callback ){
        if(whitelist.includes(origin)){
            //permitir la conexion
            callback(null, true)
        }else{
            //no permitir la conexion
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

//Definir una ruta
app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentRoutes)
app.use('/api/users', userRoutes)

//Definir el puerto
const PORT = process.env.PORT || 4000

//Arrancar la app
app.listen(PORT, () => {
    console.log(colors.blue.bgMagenta.bold('El Servidor esta ejecundose en el puerto:', PORT))
})