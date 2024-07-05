const logger = require("../logger")

const logRequest = async(req, res, next) => {
    logger.info(`method=${req.method}   url=${req.url}`)
    next()
}

module.exports = logRequest