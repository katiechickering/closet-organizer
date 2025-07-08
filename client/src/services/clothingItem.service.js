import axios from 'axios'

const CLOTHING_ITEM_INSTANCE = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/clothingItem",
    withCredentials: true
})

// Read
export const getAllClothingItems = async (allClothingItems) => {
    try {
    const RES = await CLOTHING_ITEM_INSTANCE.get('/')
    return RES.data
    } catch (error) { throw error}
}

export const getClothingItemById = async (id) => {
    try {
        const RES = await CLOTHING_ITEM_INSTANCE.get(`/${id}`)
        return RES.data
    }
    catch (error) {throw error}
}

// Update
export const updateClothingItem = async (editedClothingItem) => {
    try {
        const RES = await CLOTHING_ITEM_INSTANCE.put(`/${editedClothingItem._id}`, editedClothingItem)
        return RES.data
    }
    catch (error) {throw error}
}

// Create
export const createClothingItem = async (newClothingItem) => {
    try {
        const RES = await CLOTHING_ITEM_INSTANCE.post('/', newClothingItem)
        return RES.data
    }
    catch (error) {throw error}
}

// Delete
export const deleteClothingItemById = async (id) => {
    try {
        const RES = await CLOTHING_ITEM_INSTANCE.delete(`${id}` )
        return RES.data
    } catch(error) {throw error}
}