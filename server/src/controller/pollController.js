const { json } = require("express")
const { listPolls, getPollByID, insertPoll, deletePoll, updatePoll } = require("../repository/pollRepository")
const errors = require("../types/errors")


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
    res.status(201).json({message: "created poll", id: id})
}

const deletePollController = async(req, res) => {
    const id = await deletePoll(parseInt(req.params.id, 10))
    if (!id) {
        res.status(errors.INERNAL_ERROR.code).json(errors.INERNAL_ERROR)
        return
    }
    res.status(200).json({message: "Deleted poll", id: id})
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
    res.status(200).json({message: "Updated poll", id: id})
}

module.exports = {
    listPollsController, getPollController, createPollController, deletePollController, updatePollController
}