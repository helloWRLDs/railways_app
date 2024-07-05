import axios from 'axios'

const BASE_API = "http://localhost:8081"

export const getPolls = () => axios.get(`${BASE_API}/polls`)

export const listPollResponses = () => axios.get(`${BASE_API}/polls/responses`)