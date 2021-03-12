import axios from 'axios'
const baseUrl = '/api/users/'



const getAll = () => {
    const response = axios.get(baseUrl)
    return response.data
}


const create = async (userObject) => {
    const response = await axios.post(baseUrl, userObject)
    return response.data 
}


export default {getAll, create }