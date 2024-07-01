import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config({path: "../.env"})

const BASE_API_URL = process.env.POLL_URL

export const listPollsService = async() => {
    try {
        const res = await axios.get(BASE_API_URL + '/polls')
        return res.data
    } catch(e) {
        return null
    }
}