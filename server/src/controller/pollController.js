const { json } = require("express")
const { listPolls, getPollByID, insertPoll, deletePoll, updatePoll } = require("../repository/pollRepository")
const errors = require("../types/errors")
const { getUserByUsername } = require("../repository/userRepository")
const { getResponsesByPollId, insertPollResponse, listPollResponses } = require("../repository/pollResponsesRepository")


const listPollsController = async(req, res) => {
    const polls = await listPolls()
    if (polls.length < 1) {
        res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND)
        return
    }
    res.status(200).json(polls)
}

const getPollController = async(req, res) => {
    const poll = await getPollByID(parseInt(req.params.id, 10))
    res.status(200).json(poll)
}

const createPollController = async(req, res) => {
    const poll = {}
    if (!req.body.question) {
        res.status(errors.INVALID_INPUT.code).json({
            code: errors.INVALID_INPUT.code,
            message: errors.INVALID_INPUT.message,
            description: "Request must contain question"
        })
        return
    }
    if (!req.body.answers) {
        res.status(errors.INVALID_INPUT.code).json({
            code: errors.INVALID_INPUT.code,
            message: errors.INVALID_INPUT.message,
            description: "Request must contain answers"
        })
        return
    }
    poll.question = req.body.question
    poll.answers = req.body.answers
    const id = await insertPoll(poll)
    if (!id) {
        res.status(errors.INERNAL_ERROR.code).json(errors.INERNAL_ERROR)
        return
    }
    res.status(201).json({code: 201, message: "created poll", id: id})
}

const deletePollController = async(req, res) => {
    const id = await deletePoll(parseInt(req.params.id, 10))
    if (!id) {
        res.status(errors.INERNAL_ERROR.code).json(errors.INERNAL_ERROR)
        return
    }
    res.status(200).json({code: 200, message: "Deleted poll", id: id})
}

const updatePollController = async(req, res) => {
    const poll = {}
    if (!req.body.question) {
        res.status(errors.INVALID_INPUT.code).json({
            code: errors.INVALID_INPUT.code,
            message: errors.INVALID_INPUT.message,
            description: "Request must contain question"
        })
        return
    }
    if (!req.body.answers) {
        res.status(errors.INVALID_INPUT.code).json({
            code: errors.INVALID_INPUT.code,
            message: errors.INVALID_INPUT.message,
            description: "Request must contain answers"
        })
        return
    }
    poll.question = req.body.question
    poll.answers = req.body.answers
    const id = await updatePoll(parseInt(req.params.id, 10), poll)
    if (!id) {
        res.status(errors.INERNAL_ERROR.code).json(errors.INERNAL_ERROR)
        return
    }
    res.status(200).json({code: 200, message: "Updated poll", description: `poll_id = ${id}`})
}

const getPollResponsesController = async(req, res) => {
    const responses = await getResponsesByPollId(parseInt(req.params.id, 10))
    console.log(responses)
    if (responses.length < 1) {
        res.status(errors.NOT_FOUND.code).json(errors.NOT_FOUND)
        return
    }
    res.status(200).json(responses)
}

const createPollResponseController = async(req, res) => {
    const user = await getUserByUsername(req.body.username)
    if (!user) {
        const err = errors.NOT_FOUND
        err.description = `user with username = ${req.body.username} not found`
        res.status(errors.NOT_FOUND.code).json(err)
        return
    }
    const pollResponse = {
        user_id: user.id,
        question_id: parseInt(req.params.id, 10),
        answer: parseInt(req.body.answer)
    }
    const id = await insertPollResponse(pollResponse)
    if (id < 0) {
        res.status(errors.INERNAL_ERROR.code).json(errors.INERNAL_ERROR)
        return
    }
    res.status(201).json({
        code: 201,
        message: "Created poll response",
        id: id
    })
}

const listPollResponsesController = async(req, res) => {
    const response = await listPollResponses()
    res.status(200).json(response)
}

module.exports = {
    listPollsController, 
    getPollController, 
    createPollController, 
    deletePollController, 
    updatePollController,
    getPollResponsesController,
    createPollResponseController,
    listPollResponsesController
}