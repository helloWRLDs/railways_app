const express = require('express')

const { 
    loginUserController, 
    registerUserController,
    authenticateTelegramUserController,
    telegramToEmailController,
    verifyTelegramUserController, 
} = require('../controller/authController')


const authRouter = express.Router()

authRouter.post('/login', loginUserController)
authRouter.post('/register', registerUserController)
authRouter.post('/bot', authenticateTelegramUserController)
authRouter.post('/bot/link', telegramToEmailController)
authRouter.post('/bot/link/verify/:code', verifyTelegramUserController)


module.exports = authRouter