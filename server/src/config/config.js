const dotenv = require('dotenv')

dotenv.config()

const config = {
    PORT: process.env.PORT || 8080,
    JWT_SECRET: "secret"
}

module.exports = (
    config
)