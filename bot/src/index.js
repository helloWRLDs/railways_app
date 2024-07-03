import TelegramBot from 'node-telegram-bot-api'
import Handler from './handler.js'
import config from './config/config.js'


const bot = new TelegramBot(config.BOT_TOKEN, {polling: true})
const handler = new Handler(bot)

handler.configure()

handler.listen()
