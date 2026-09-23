
import {Router} from "express";

import {getHome, getAbout, postUser} from "../controllers/userController.js";

const router = Router()

router.get("/", getHome).get("/about", getAbout).post("/signup", postUser)

export default router