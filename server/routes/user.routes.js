import { Router } from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getUserProfile, getUsers, loginUser, logOutUser, registerUser } from "../controllers/user.controller.js"

const userRouter = Router()

userRouter.route('/')
    .get( protect, getUsers )
    .post( registerUser )

userRouter.route('/profile')
    .get( protect, getUserProfile )

userRouter.route('/login')
    .post( loginUser )

userRouter.route('/logout')
    .post( logOutUser )

export default userRouter