

import { userModels } from "../models/userModels.js";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const secret = process.env.JWT_SECRET

export const authMiddleware = async (req, res, next) => {
    try{
        const token = req.cookies.token

        if(!token || token === "") {
            return res.status(401).json({
                message: "Unauthorized token"
            })
        }
        const decodedToken= jwt.verify(token, secret)

        const user = await userModels.findById
        (decodedToken.id)

        if(!user) {
            return res.status(404).json({
                message: `User with id:${decodedToken.id} does not exist.`,
                error: true
            })
        }
        req.user = user
        next()
    }catch(err){
        console.error(err)
        throw new Error(err)
    }
}