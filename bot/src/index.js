import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import Handler from './handler.js'

dotenv.config()

const bot = new TelegramBot(process.env.BOT_TOKEN, {polling: true})
const handler = new Handler(bot)

handler.configure()

handler.listen()
