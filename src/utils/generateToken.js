


import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

const secret = process.env.JWT_SECRET

export const generateToken = (userId) => {
  const token = jwt.sign({id: userId}, secret,
    {expiresIn: '7d'

    })

    return token;
}