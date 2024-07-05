const { listUsers, getUserById, isUserExistById } = require("../repository/userRepository")
const errors = require("../types/errors")

const listUsersController = async(req, res) => {
    const users = await listUsers()
    if (users.length === 0) {
        res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND)
        return
    }
    res.status(200).json(users)
}

const getUserController = async(req, res) => {
    const user = await getUserById(parseInt(req.params.id, 10))
    res.status(200).json(user)
}

const deleteUserController = async(req, res) => {
    res.status(200).json("Delete user")
}

const updateUserController = async(req, res) => {
    res.status(200).json("Update user")
}

const createUserController = async(req, res) => {
    res.status(201).json("Create user")
}

module.exports = {
    listUsersController,
    getUserController,
    deleteUserController,
    updateUserController,
    createUserController
}