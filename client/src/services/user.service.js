import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/user",
    withCredentials: true
})

export const register = async data => {
    try {
        const RES = await USER_INSTANCE.post('/', data )
        return RES
    } catch( error ){ throw error.response.data.errors }
}

export const login = async data => {
    try {
        const RES = await USER_INSTANCE.post( '/login', data )
        return RES
    } catch( error ){ throw error.response.data }
}

export const logout = async () => {
    try {
        const RES = await USER_INSTANCE.post( '/logout' )
        return RES
    } catch( error ){ throw error }
}

export const getProfile = async () => {
    try {
        const RES = await USER_INSTANCE.get( '/profile' )
        return RES.data
    } catch( error ){ throw error }
}

export const getAllUsers = async () => {
    try {
        const RES = await USER_INSTANCE.get( '/' )
        return RES.data
    } catch( error ){ throw error }
}