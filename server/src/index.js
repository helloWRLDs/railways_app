const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

const logger = require('./logger')
const userRouter = require('./router/user')
const contentJson = require('./middleware/contentType')
const pollRouter = require('./router/poll')

dotenv.config()
const PORT = process.env.PORT || 8080

const app = express()
app.use(cors(), contentJson)
app.use(express.json());

app.get('/ping', async(req, res) => {
    res.status(200).json("pong")
})

app.use('/users', userRouter)
app.use('/polls', pollRouter)

app.listen(PORT, () => {
    logger.info(`server started on port=${PORT}`)
})
