import {Router} from "express"
import { createClothingItem, deleteClothingItemById, getAllClothingItems, getClothingItemById, updateClothingItemById } from "../controllers/clothingItem.controller.js"
import { protect } from "../middleware/authMiddleware.js"

const clothingItemRouter = Router()

clothingItemRouter.route("/")
    .get(protect, getAllClothingItems)
    .post(protect, createClothingItem)

clothingItemRouter.route("/:id")
    .get(protect, getClothingItemById)
    .put(protect, updateClothingItemById)
    .delete(protect, deleteClothingItemById)

export default clothingItemRouter