import dotenv from 'dotenv'

dotenv.config()

const config = {
    BOT_TOKEN: process.env.BOT_TOKEN,
    BOT_URL: process.env.BOT_URL,
    POLL_URL: process.env.POLL_URL
}

export default config