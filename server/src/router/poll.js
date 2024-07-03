const express = require('express')

const { 
    listPollsController, 
    getPollController, 
    createPollController, 
    deletePollController, 
    updatePollController, 
    createPollResponseController,
    getPollResponsesController,
    listPollResponsesController
} = require('../controller/pollController')
const { validatePollId } = require('../middleware/validateId')


const pollRouter = express.Router()

pollRouter.get('/:id', validatePollId, getPollController)
pollRouter.get('/', listPollsController)
pollRouter.post('/', createPollController)
pollRouter.delete('/:id', validatePollId, deletePollController)
pollRouter.put('/:id', validatePollId, updatePollController)

pollRouter.get('/responses', listPollResponsesController)
pollRouter.get('/:id/responses', validatePollId, getPollResponsesController)
pollRouter.post('/:id/responses', validatePollId, createPollResponseController)

module.exports = pollRouter
