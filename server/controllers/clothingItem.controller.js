import ClothingItem from "../models/clothingItem.model.js";

// Create
export const createClothingItem = async (req, res) => {
    try {
        const NEW_CLOTHINGITEM = await ClothingItem.create({
        ...req.body,
        user: req.user.id,
        })
        res.status(201).json(NEW_CLOTHINGITEM)
    } catch (error) {res.status(400).json(error)}
}

// Read
export const getAllClothingItems = async (req, res) => {
    try {
        const CLOTHINGITEMS = await ClothingItem.find({ user: req.user.id })
        res.status(201).json(CLOTHINGITEMS)
    } catch (error) {res.status(400).json(error)}
}

export const getClothingItemById = async (req, res) => {
    try {
        const CLOTHINGITEM = await ClothingItem.findById(req.params.id)
        if (CLOTHINGITEM.user.toString() !== req.user.id) {
            return res.status(404).json({ error: "Access Denied" });
        }
        res.status(201).json(CLOTHINGITEM)
    } catch (error) {res.status(400).json(error)}
}

// Update
export const updateClothingItemById = async (req, res) => {
    const options = {
        new: true,
        runValidators: true
    }
    try {
        const UPDATED_CLOTHINGITEM = await ClothingItem.findByIdAndUpdate(req.params.id, req.body, options)
        if (UPDATED_CLOTHINGITEM.user.toString() !== req.user.id) {
            return res.status(404).json({ error: "Access Denied" });
        }
        res.status(201).json(UPDATED_CLOTHINGITEM)
    } catch (error) {res.status(400).json(error)}
}

// Delete
export const deleteClothingItemById = async (req, res) => {
    try {
        const DELETED_CLOTHINGITEM = await ClothingItem.findByIdAndDelete(req.params.id)
        if (DELETED_CLOTHINGITEM.user.toString() !== req.user.id) {
            return res.status(404).json({ error: "Access Denied" });
        }
        res.status(201).json(DELETED_CLOTHINGITEM)
    } catch (error) {res.status(400).json(error)}
}