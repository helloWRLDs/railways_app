const logger = require('pino')({
    transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:hh:MM:ss'
        }
    }
})

module.exports = logger;