import { getGuideKeyboard } from './data/guide.js';

export const mainMenuOptions = () => {
    return {
        reply_markup: {
            keyboard: [
                ["🗺️ Путеводитель", "📞 Контакты"],
                ["❌ Закрыть меню"]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    };
};


export const guidanceOptions = () => {
    return {
        reply_markup: {
            inline_keyboard: getGuideKeyboard()
        },
        resize_keyboard: true
    }
}

export const guidanceOptionsFromCtx = (ctx) => {
    return {
        chat_id: ctx.message.chat.id,
        message_id: ctx.message.message_id,
        reply_markup: {
            inline_keyboard: getGuideKeyboard()
        }, 
        resize_keyboard: true
    }
}