
import {Router} from "express";

import {getHome, getAbout} from "../controllers/userController.js";

const router = Router()

router.get("/", getHome).get("/about", getAbout)

export default router