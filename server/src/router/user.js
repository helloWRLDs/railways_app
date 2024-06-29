const express = require('express')
const userRouter = express.Router()

const {
    listUsersController, 
    getUserController, 
    deleteUserController, 
    updateUserController, 
    createUserController
} = require('../controller/user')


userRouter.get('/', listUsersController)
userRouter.get('/:id', getUserController)
userRouter.post('/', createUserController)
userRouter.delete('/:id', deleteUserController)
userRouter.put('/:id', updateUserController)

module.exports = userRouter