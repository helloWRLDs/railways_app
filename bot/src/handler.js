import commandsJson from '../docs/commands.json' assert {type: "json"}
import config from './config/config.js'
import { listPollsService, pollKeyboardWithOptions, sendPollResponseService } from './services/pollService.js'
import { getWelcomeBookMesh, welcomeBookCallbacks } from './services/welcomeBookService.js'
import { getNumber } from './util/getFromString.js'
import navButtonsMesh from './util/navigationBar.js'

class Handler {
    #wbCallbacks = {}
    #pollCallbacks = {}
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
        this.#wbCallbacks = welcomeBookCallbacks()
    }

    listen = async() => {
        this._bot.on('message', async(msg) => {
            console.log(msg)
        })

        // Process commands
        this._bot.onText(RegExp('^/'), async(msg) => {
            switch(msg.text) {
                case '/start': 
                    return this._bot.sendMessage(msg.chat.id, `👋🏻 Привет, ${msg.from.first_name}`)
                case '/help': 
                    return this._bot.sendMessage(msg.chat.id, `Раздел помощи`)
                case '/ref': 
                    return this._bot.sendMessage(msg.chat.id, config.BOT_URL)
                case '/menu': 
                    return this._bot.sendMessage(msg.chat.id, 'Меню бота', {
                        reply_markup: {
                            keyboard: [
                                ["🗺️ Путеводитель", "📞 Контакты"],
                                ["❌ Закрыть меню"]
                            ],
                            resize_keyboard: true,
                            one_time_keyboard: true
                        }
                    });
                case '/poll': 
                    const poll = await listPollsService()
                    console.log(poll)
                    return this._bot.sendMessage(msg.chat.id, poll[0].question, {
                        reply_markup: {inline_keyboard: pollKeyboardWithOptions(poll[0].answers, poll[0].id)},
                        resize_keyboard: true
                    })
                    // return this._bot.sendPoll(msg.chat.id, poll[0].question, poll[0].answers, {is_anonymous: false})
            }
        })
        
        // Process text
        this._bot.onText(RegExp('^[^/]'), async(msg) => {
            switch(msg.text) {
                case '🗺️ Путеводитель': 
                    return this._bot.sendMessage(msg.chat.id, 'ДОБРО ПОЖАЛОВАТЬ В КОМАНДУ АО «НК «ҚТЖ»!', {
                        reply_markup: {inline_keyboard: getWelcomeBookMesh()},
                        resize_keyboard: true
                    })
                case '❌ Закрыть меню': 
                    return this.#closeKeyboard(msg)
            }
        })

        // Process callbacks
        this._bot.on('callback_query', async(ctx) => {
            switch(ctx.data) {
                case 'close': 
                    return this.#closeInlineKeyboard(ctx)
                case '📋 Home': 
                    return this._bot.editMessageText('ДОБРО ПОЖАЛОВАТЬ В КОМАНДУ АО «НК «ҚТЖ»!', {
                        chat_id: ctx.message.chat.id,
                        message_id: ctx.message.message_id,
                        reply_markup: {inline_keyboard: getWelcomeBookMesh()}, 
                        resize_keyboard: true
                    })
            }
            if (ctx.data.startsWith('wb')) {
                console.log(ctx)
                return await this._bot.editMessageText(this.#wbCallbacks[ctx.data], {
                    chat_id: ctx.message.chat.id,
                    message_id: ctx.message.message_id,
                    reply_markup: {
                        inline_keyboard: navButtonsMesh(this.#wbCallbacks, ctx.data),
                        resize_keyboard: true
                    },
                    parse_mode: "MarkdownV2"
                })
                // try {
                //     await this._bot.editMessageText(this.#wbCallbacks[ctx.data], {
                //         chat_id: ctx.message.chat.id,
                //         message_id: ctx.message.message_id,
                //         reply_markup: {
                //             inline_keyboard: navButtonsMesh(this.#wbCallbacks, ctx.data),
                //             resize_keyboard: true
                //         },
                //         parse_mode: "MarkdownV2"
                //     })
                // } catch(e) {
                //     await this._bot.sendMessage(ctx.message.chat.id, this.#wbCallbacks[ctx.data], {
                //         reply_markup: {
                //             inline_keyboard: navButtonsMesh(this.#wbCallbacks, ctx.data),
                //             resize_keyboard: true
                //         },
                //         parse_mode: "MarkdownV2"
                //     })
                // }
            }

            if (ctx.data.startsWith('poll')) {
                const data = ctx.data.split("_")
                console.log(data)
                const poll_id = data[1]
                const answer_id = data[2]
                console.log(
                    `\n\nQuestion: ${ctx.message.text}\nQuestion_id: ${poll_id}\nAnswer_id: ${answer_id}`
                )
                await sendPollResponseService(poll_id, answer_id, )
            }
        })

        // Process poll responds
        this._bot.on('poll', async(msg) => {
            console.log(msg)
        })

        this._bot.on('poll_answer', async(msg) => {
            console.log(msg)
            this._bot.sendMessage(msg.user.id, "next question")
        })

        // Process errors
        this._bot.on('polling_error', console.log)
    }
}

export default Handler;