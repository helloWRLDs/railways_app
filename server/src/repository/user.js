const { where } = require('sequelize')
const logger = require('../logger')
const db = require('../models/index')

const listUsers = async() => {
    const users = []
    try {
        const response = await db.User.findAll()
        response.forEach(elem => users.push(elem.dataValues))
    } catch(e) {
        logger.error(`db error: ${e}`)
    }
    return users
}

const getUserById = async(id) => {
    let user = {}
    try {
        const response = await db.User.findOne({
            where: {
                id: id
            }
        })
        user = response.dataValues ?? response.dataValues
    } catch(e) {
        console.log(e)
    }
    return user
}

module.exports = {
    listUsers,
    getUserById
}