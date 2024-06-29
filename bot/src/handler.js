import commandsJson from '../docs/commands.json' assert {type: "json"}
import { getGuideCallbacks } from './data/guide.js'
import { guidanceOptions, guidanceOptionsFromCtx, mainMenuOptions } from './options.js'

class Handler {
    #callbacks = {}
    constructor(bot) {
        this._bot = bot
    }

    #closeKeyboard = async(msg) => {
        const current_msg = await this._bot.sendMessage(msg.chat.id, "Меню закрыто", {
            reply_markup: {
                remove_keyboard: true
            }
        })
        // this._bot.deleteMessage(msg.chat.id, current_msg.message_id)
        this._bot.deleteMessage(msg.chat.id, msg.message_id)
    }

    #closeInlineKeyboard = async(ctx) => {
        this._bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id)
        this._bot.deleteMessage(ctx.message.chat.id, ctx.message.message_id - 1)
    }

    configure = () => {
        this._bot.setMyCommands(commandsJson)
        this.#callbacks = getGuideCallbacks()
    }

    listen = async() => {
        this._bot.on('message', async(msg) => {
            console.log(msg)
        })

        // Process commands
        this._bot.onText(RegExp('^/'), async(msg) => {
            switch(msg.text) {
                case '/start': return this._bot.sendMessage(msg.chat.id, `👋🏻 Привет, ${msg.from.first_name}`)
                case '/help': return this._bot.sendMessage(msg.chat.id, `Раздел помощи`)
                case '/ref': return this._bot.sendMessage(msg.chat.id, process.env.BOT_URL)
                case '/menu': return this._bot.sendMessage(msg.chat.id, 'Меню бота', mainMenuOptions())
                case '/poll': return this._bot.sendPoll(msg.chat.id, "What is ur favorite food?", ["pizza", "steak", "ice cream"])
            }
        })
        
        // Process text
        this._bot.onText(RegExp('^[^/]'), async(msg) => {
            switch(msg.text) {
                case '🗺️ Путеводитель': return this._bot.sendMessage(msg.chat.id, 'ДОБРО ПОЖАЛОВАТЬ В КОМАНДУ АО «НК «ҚТЖ»!', guidanceOptions())
                case '❌ Закрыть меню': return this.#closeKeyboard(msg)
            }
        })

        // Process callbacks
        this._bot.on('callback_query', async(ctx) => {
            switch(ctx.data) {
                case 'close': return this.#closeInlineKeyboard(ctx)
                case '🗺️ Путеводитель': return this._bot.editMessageText('ДОБРО ПОЖАЛОВАТЬ В КОМАНДУ АО «НК «ҚТЖ»!', guidanceOptionsFromCtx(ctx))
            }
        })

        // Process poll responds
        this._bot.on('poll', async(msg) => {
            console.log(msg)
        })

        // Process errors
        this._bot.on('polling_error', console.log)
    }
}

export default Handler;