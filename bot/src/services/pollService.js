import axios from 'axios'
import config from '../config/config.js'

const BASE_API_URL = config.POLL_URL

export const listPollsService = async() => {
    try {
        const res = await axios.get(BASE_API_URL + '/polls')
        return res.data
    } catch(e) {
        return null
    }
}

export const pollKeyboardWithOptions = (options, questionId) => {
    const result = []
    for (let i = 0; i < options.length; i++) {
        result.push([{text: options[i], callback_data: `poll_${questionId}_${i + 1}`}])
    }
    return result
}

// export const pollCallbacks = (poll) => {
//     const result = {}
//     for (let i = 0; i < poll.length; i++) {
//         result[`poll_`]
//     }
// }