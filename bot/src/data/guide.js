import data from '../../docs/guidance.json' assert {type: "json"}
import { escapeMarkdown } from '../util/formatter.js'

export const getGuideCallbacks = () => {
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

export const getGuideKeyboard = () => {
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

export const navButtons = (arr, elem) => {
    const result = []
    const id = Object.keys(arr).indexOf(elem)
    if (id >= 0) {
        if (id > 0) {
            result.push({text: "⬅️", callback_data: Object.keys(arr)[id - 1]})
        }
        result.push({text: "📋 Home", callback_data: "🗺️ Путеводитель"})
        if (id + 1 < Object.keys(arr).length) {
            result.push({text: "➡️", callback_data: Object.keys(arr)[id + 1]})
        }
    }
    return [result]
}