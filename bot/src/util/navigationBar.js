

const navButtonsMesh = (arr, elem) => {
    const result = []
    const id = Object.keys(arr).indexOf(elem)
    if (id >= 0) {
        if (id > 0) {
            result.push({text: "⬅️", callback_data: Object.keys(arr)[id - 1]})
        }
        result.push({text: "📋 Home", callback_data: "📋 Home"})
        if (id + 1 < Object.keys(arr).length) {
            result.push({text: "➡️", callback_data: Object.keys(arr)[id + 1]})
        }
    }
    return [result]
}

export default navButtonsMesh