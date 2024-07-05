import axios from 'axios'
import config from '../config/config.js'

const BASE_API_URL = config.POLL_URL

export const isAuthenticated = async(username) => {
    try{
        const res = await axios.post(BASE_API_URL + '/auth/bot', {
            username: username
        })
        console.log(res)
        return res.status ? true : false
    } catch(e) {
        console.error(e)
        return false
    }
}
