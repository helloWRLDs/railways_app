const cfg = require('./config/config')
const logger = require('./logger')

const app = require('express')()

app.use(require('cors')())

app.get('/ping', async(req, res) => {
    res.status(200).json("pong")
})

app.listen(cfg.PORT, () => {
    logger.info(`server started on port=${cfg.PORT}`)
})

