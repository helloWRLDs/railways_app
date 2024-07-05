import commandsJson from '../docs/commands.json' assert {type: "json"}
import config from './config/config.js'
import { isAuthenticated } from './services/authService.js'
import { listPollsService, pollKeyboardWithOptions, sendPollResponseService } from './services/pollService.js'
import { getWelcomeBookMesh, welcomeBookCallbacks } from './services/welcomeBookService.js'
import navButtonsMesh from './util/navigationBar.js'

class Handler {
    #wbCallbacks = {}
    #pollCallbacks = {}
    states = {}
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
                    this._bot.sendMessage(msg.chat.id, `👋🏻 Привет, ${msg.from.first_name}`)
                    if (!isAuthenticated(msg.chat.username)) {
                        this._bot.sendMessage(msg.chat.id, "Введите пожалуйста свою почту")
                        this.states[msg.chat.id] = {awaitingEmail: true}
                    }
                    return 
                // case '/auth':
                //     if (!await isAuthenticated(msg.chat.username, msg.chat.id)) {
                //         this.states[msg.chat.id] = {awaitingCredentials: true}
                //         return this._bot.sendMessage(msg.chat.id, "Введите email и пароль (через пробел)")
                //     } else {
                //         return this._bot.sendMessage(msg.chat.id, "Вы успешно авторизованы")
                //     }
                case '/help': 
                    return this._bot.sendMessage(msg.chat.id, `Раздел помощи`)
                case '/ref': 
                    return this._bot.sendMessage(msg.chat.id, config.BOT_URL)
                case '/menu': 
                    return this._bot.sendMessage(msg.chat.id, 'Меню бота', {
                        reply_markup: {
                            keyboard: [
                                ["🗺️ Путеводитель", "✅ Опрос"],
                                ["📞 Контакты"],
                                ["❌ Закрыть меню"]
                            ],
                            resize_keyboard: true,
                            one_time_keyboard: true
                        }
                    });
            }
        })
        
        // Process text
        this._bot.onText(RegExp('^[^/]'), async(msg) => {

            // Authorize listener
            if (this.states[msg.chat.id] && this.states[msg.chat.id].awaitingEmail) {
                const email = msg.text
                if (!email) {
                    return this._bot.sendMessage(msg.chat.id, "Попробуйте еще раз")
                }
                this.states[msg.chat.id].awaitingEmail = false
                
                
            }

            switch(msg.text) {
                case '🗺️ Путеводитель': 
                    return this._bot.sendMessage(msg.chat.id, 'ДОБРО ПОЖАЛОВАТЬ В КОМАНДУ АО «НК «ҚТЖ»!', {
                        reply_markup: {inline_keyboard: getWelcomeBookMesh()},
                        resize_keyboard: true
                    })
                case '❌ Закрыть меню': 
                    return this.#closeKeyboard(msg)
                case '✅ Опрос':
                    if (!(await isAuthenticated(msg.chat.username, msg.chat.id))) {
                        return this._bot.sendMessage(msg.chat.id, "Убедитесь, что вы авторизованы[/auth]")
                    }
                    const poll = await listPollsService()
                    console.log(poll)
                    return this._bot.sendMessage(msg.chat.id, poll[0].question, {
                        reply_markup: {inline_keyboard: pollKeyboardWithOptions(poll[0].answers, poll[0].id)},
                        resize_keyboard: true
                    })
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
            }

            if (ctx.data.startsWith('poll')) {
                const data = ctx.data.split("_")
                const poll_id = data[1]
                const answer_id = data[2]
                
                await sendPollResponseService(poll_id, answer_id, ctx.from.username)

                const polls = await listPollsService()
                const id = polls.map(function(x) {return x.id}).indexOf(parseInt(poll_id, 10))
                if (!polls[id + 1]) {
                    this._bot.editMessageText('Спасибо за прохождение опросов!', {
                        chat_id: ctx.message.chat.id,
                        message_id: ctx.message.message_id
                    })
                } else {
                    this._bot.editMessageText(polls[id + 1].question, {
                        chat_id: ctx.message.chat.id,
                        message_id: ctx.message.message_id,
                        reply_markup: {inline_keyboard: pollKeyboardWithOptions(polls[id + 1].answers, polls[id + 1].id)},
                        resize_keyboard: true
                    })
                }
                // const res = await sendPollResponseService(poll_id, answer_id, ctx.chat.username)
                // if (res.status === 200) {

                // }
            }
        })

        // Process errors
        this._bot.on('polling_error', console.log)
    }
}

export default Handler;