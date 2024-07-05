import axios from 'axios'
// import dotenv from 'dotenv'
// dotenv.config()

const BASE_API = "http://localhost:8081"

export const getUsers = () => axios.get(`${BASE_API}/users`)