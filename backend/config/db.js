import mongoose from 'mongoose'
import colors from 'colors'

export const db = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        const url  = `${db.connection.host}:${db.connection.port}`
        console.log(colors.blue(`MongoDB se conecto correctamente: ${url}`))
    } catch (error) {
        console.log(`Error: ${error.message}`)
        process.exit(1)
    }
}