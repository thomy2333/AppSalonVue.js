import express from 'express'
import { createAppointment, getAppintmentsByDate, getAppintmentsById, updateAppointment, deleteAppointment} from '../controllers/appointmentController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/')
    .post(authMiddleware, createAppointment)
    .get(authMiddleware, getAppintmentsByDate)

router.route('/:id')
    .get(authMiddleware, getAppintmentsById)
    .put(authMiddleware, updateAppointment)
    .delete(authMiddleware, deleteAppointment)
    
export default router