import {Router} from "express"
import { createClothingItem, deleteClothingItemById, getAllClothingItems, getClothingItemById, updateClothingItemById } from "../controllers/clothingItem.controller"

const clothingItemRouter = Router()

clothingItemRouter.route("/")
    .get(getAllClothingItems)
    .post(createClothingItem)

clothingItemRouter.route("/:id")
    .get(getClothingItemById)
    .put(updateClothingItemById)
    .delete(deleteClothingItemById)

export default clothingItemRouter