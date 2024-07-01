const logger = require('../logger')
const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

const insertPoll = async(poll) => {
    try {
        const res = await client.question.create({
            data: {
                question: poll.question,
                answers: poll.answers
            }
        })
        return res.id
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return -1
    }
}

const getPollByID = async(id) => {
    try {
        const res = await client.question.findUnique({where: {id: id}})
        return res
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return null
    }
}

const deletePoll = async(id) => {
    try {
        const res = await client.question.delete({where: {id: id}})
        return res.id
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return -1
    }
}

const updatePoll = async(id, poll) => {
    try {
        const res = await client.question.update({
            where: {id: id},
            data: {
                question: poll.question,
                answers: poll.answers
            }
        })
        return res.id
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return -1
    }
}

const isPollExistById = async(id) => await client.question.count({where: {id: id}}) ? true : false

const listPolls = async() => await client.question.findMany()

module.exports = {
    insertPoll, listPolls, getPollByID, isPollExistById, deletePoll, updatePoll
}