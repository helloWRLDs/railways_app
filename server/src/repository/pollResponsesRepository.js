const { query } = require('express')
const logger = require('../logger')
const { PrismaClient } = require('@prisma/client')

const client = new PrismaClient()

const listPollResponses = async() => {
    const res = await client.$queryRaw`
    SELECT u.id as user_id, u.email as email, q.question as question, q.answers[qr.answer] as answer 
    FROM "QuestionResponse" AS qr 
    INNER JOIN "User" as u 
    ON u.id = qr.user_id 
    INNER JOIN "Question" AS q 
    ON q.id = qr.question_id
    `
    console.log(res)
    return res
}

const getResponsesByPollId = async(id) => {
    try{
        const res = await client.questionResponse.findMany({where: {question_id: id}})
        return res
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return null
    }
}

const insertPollResponse = async(response) => {
    try {
        const res = await client.questionResponse.create({
            data: {
                user_id: response.user_id,
                question_id: response.question_id,
                answer: response.answer
            }
        })
        return res.id
    } catch(e) {
        logger.error(`sql query err: ${e}`)
        return -1
    }
}

module.exports = {
    getResponsesByPollId,
    insertPollResponse,
    listPollResponses
}