import { Router } from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getUserProfile, getUsers, loginUser, logOutUser, registerUser } from "../controllers/user.controller.js"

const userRouter = Router()

router.route('/')
    .get( protect, getUsers )
    .post( registerUser )

router.route('/profile')
    .get( protect, getUserProfile )

router.route('/login')
    .post( loginUser )

router.route('/logout')
    .post( logOutUser )

export default userRouter