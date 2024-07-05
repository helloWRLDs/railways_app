const logger = require('../logger')
const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

const createVerificationCode = async(user_id, code) => {
    try {
        const res = await client.verificationCodes.create({
            data: {
                code: code,
                user_id: user_id
            }
        })
        return res.id
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return null
    }
}

const deleteVerificationCode = async(code) => {
    try {
        const res = await client.verificationCodes.delete({where: {code: code}})
        return true
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return false
    }
}

const getUserIdByCode = async(code) => {
    try {
        const res = await client.verificationCodes.findFirst({where: {code: code}})
        return res.user_id
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return null
    }
}

module.exports = {
    createVerificationCode,
    getUserIdByCode,
    deleteVerificationCode
}