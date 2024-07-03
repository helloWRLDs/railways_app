
export const getNumber = (text) => {
    let result = ""
    for (let i = 1; i < text.length; i++) {
        if (!isNaN(text[i])) {
            result += text[i]
        } else {
            break
        }
    }
    return result
}