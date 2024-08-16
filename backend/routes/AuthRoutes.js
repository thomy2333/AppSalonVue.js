import express from 'express'
import { register, verifyAccount, login, user, forgotPassword, verifyPassResetToken, updatePassword, admin} from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const router = express.Router()

//Rutas de autenticacion y registros de usuario

router.post('/register', register)
router.get('/verify/:token', verifyAccount)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.route('/forgot-password/:token',)
    .get(verifyPassResetToken)
    .post(updatePassword)

//area privada
router.get('/user', authMiddleware, user )
router.get('/admin', authMiddleware, admin )

export default router