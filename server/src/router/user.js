const express = require('express')
const userRouter = express.Router()

const {
    listUsersController, 
    getUserController, 
    deleteUserController, 
    updateUserController, 
    createUserController
} = require('../controller/user')
const validateId = require('../middleware/validateId')


userRouter.get('/', listUsersController)
userRouter.get('/:id', validateId, getUserController)
userRouter.post('/', createUserController)
userRouter.delete('/:id', validateId, deleteUserController)
userRouter.put('/:id', validateId, updateUserController)

module.exports = userRouter