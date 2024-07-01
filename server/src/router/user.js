const express = require('express')

const {
    listUsersController, 
    getUserController, 
    deleteUserController, 
    updateUserController, 
    createUserController
} = require('../controller/userController')
const {validateUserId} = require('../middleware/validateId')


const userRouter = express.Router()

userRouter.get('/', listUsersController)
userRouter.get('/:id', validateUserId, getUserController)
userRouter.post('/', createUserController)
userRouter.delete('/:id', validateUserId, deleteUserController)
userRouter.put('/:id', validateUserId, updateUserController)

module.exports = userRouter