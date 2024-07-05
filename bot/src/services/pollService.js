import axios from 'axios'
import config from '../config/config.js'

const BASE_API_URL = config.POLL_URL

export const listPollsService = async() => {
    console.log(BASE_API_URL + '/polls')
    try {
        const res = await axios.get(BASE_API_URL + '/polls')
        return res.data
    } catch(e) {
        return null
    }
}

export const sendPollResponseService = async(poll_id, answer_id, username) => {
    try {
        const res = await axios.post(BASE_API_URL + `/polls/${poll_id}/responses`, {answer: answer_id, username: username})
        console.log(res.data)
    } catch(e) {
        console.error(e)
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

