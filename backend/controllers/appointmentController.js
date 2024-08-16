import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import Appointment from '../models/Appointment.js'
import { validateObjectId, handleNotFoundError, formatDate } from "../utils/index.js";
import { sendEmailNew, sendEmailUpdate, sendEmailCancel } from "../emails/appEmail.js";



const createAppointment = async (req, res) => {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    try {
        const newAppointment = new Appointment(appointment)
        const result = await newAppointment.save()

        await sendEmailNew({
            date: formatDate(result.date),
            time: result.time
        })

        res.json({
            msg: 'Tu Reservacion se realizo correctamente',            
        })
    } catch (error) {
        return res.status(500).json({msg: "Error en el servidor"})
    }
}

const getAppintmentsByDate = async (req, res) => {
    const { date } = req.query

    const newDate = parse(date, 'dd/MM/yyyy', new Date())

    if(!isValid(newDate)){
        const error = new Error('Fecha no valida')
        return res.status(400).json({
            msg: error.message
        })
    }

    const isoDate = formatISO(newDate)

    const appointments = await Appointment.find({ date: {
        $gte : startOfDay(new Date(isoDate)),
        $lte : endOfDay(new Date(isoDate))
    }}).select('time')

    res.json(appointments)
}

const getAppintmentsById = async(req, res) => {
    const {id} = req.params

    //validar por object Id
    if(validateObjectId(id, res)) return

    //validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment){
        return handleNotFoundError('La cita no existe', res)
    }

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('No tiene los permisos')
        return res.status(403).json({msg: error.message})
    }

    //retornar la cita
    res.json(appointment)
}   

const updateAppointment = async (req, res) => {
    const {id} = req.params

    //validar por object Id
    if(validateObjectId(id, res)) return

    //validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment){
        return handleNotFoundError('La cita no existe', res)
    }

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('No tiene los permisos')
        return res.status(403).json({msg: error.message})
    }

    const { date, time, totalAmount, services } = req.body
    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services

    try {
        const result = await appointment.save()

        await sendEmailUpdate({
            date: formatDate( result.date),
            time: result.time
        })

        res.json({
            msg: 'Cita Actualizada Correctamente'
        })
    } catch (error) {
        console.log(error);
    }
}

const deleteAppointment =  async (req, res) => {
    const {id} = req.params

    //validar por object Id
    if(validateObjectId(id, res)) return

    //validar que exista
    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment){
        return handleNotFoundError('La cita no existe', res)
    }

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('No tiene los permisos')
        return res.status(403).json({msg: error.message})
    }

    try {
       const result = await Appointment.findByIdAndDelete(id)

       await sendEmailCancel({
        date: formatDate( result.date),
        time: result.time
    })

       res.json({msg: 'Cita Cancela Correctamente'})
    } catch (error) {
        console.log(error);
    }
}

export{
    createAppointment,
    getAppintmentsByDate,
    getAppintmentsById,
    updateAppointment,
    deleteAppointment
}