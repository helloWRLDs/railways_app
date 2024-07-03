const logger = require('../logger')
const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()


const insertUser = async(newUser) => {
    try {
        const res = await client.user.create({
            data: {
                first_name: newUser.first_name,
                last_name: newUser.last_name,
                email: newUser.email,
            },
        })
        return res.id
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return -1
    }
}

const getUserById = async(id) => {
    try {
        const res = client.user.findUnique({where: {id: id}})
        return res
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return null
    }
}

const getUserByUsername = async(username) => {
    try{
        const res = client.user.findFirst({where: {username: username}})
        return res
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return null
    }
}

const updateUser = async(id, user) => {
    try {
        const res  = await client.user.update({
            where: {id: id},
            data: {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                chat_id: user.chat_id || null,
                username: user.username || null,
                updated_at: new Date()
            }
        })
        return res.id
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return -1
    }
}

const deleteUser = async(id) => {
    try {
        const res = await client.user.delete({where: {id: id}})
        return res.id
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return -1
    }
}

const listUsers = async() => await client.user.findMany()

const isUserExistByEmail = async (email) => await client.user.count({where: {email: email}}) ? true : false

const isUserExistById = async(id) => await client.user.count({where: {id: id}}) ? true : false

module.exports = {
    listUsers,
    getUserById,
    insertUser,
    updateUser,
    deleteUser,
    isUserExistByEmail,
    isUserExistById,
    getUserByUsername
}