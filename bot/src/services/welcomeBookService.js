import data from '../../docs/welcome_book.json' assert {type: "json"}
import { escapeMarkdown } from '../util/formatter.js'

export const welcomeBookCallbacks = () => {
    const result = {}
    data.forEach(elem => {
        if (typeof elem.body == "string") {
            result[elem.callback] = escapeMarkdown(elem.body)
        } else {
            result[elem.callback] = elem.body
        }
    })
    return result
}

export const getWelcomeBookMesh = () => {
    const result = [];
    for (let i = 0; i < data.length; i += 2) {
        const row = [];
        row.push({text: data[i].header, callback_data: data[i].callback});
        if (i + 1 < data.length) {
            row.push({ text: data[i + 1].header, callback_data: data[i + 1].callback });
        }
        result.push(row);
    }
    result.push([{text: "❌ Закрыть", callback_data: "close"}])
    return result
}