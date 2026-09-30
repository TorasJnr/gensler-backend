

import { userModels } from "../models/userModels.js"
import { signupValidate, loginValidate } from "../validator/userValidator.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../utils/generateToken.js"

export const getHome = (req, res) => {
    res.send("Homepage!")
}

export const getUser = (req, res) => {
    res.send("User!")
}

export const getAbout = (req, res) => {
    console.log(req.url,req.method)
    res.send("About!")
}

export const postUser = async  (req, res) => {
    const {username, email, password} = req.body

    // if(!username && !email && !password) {
    //     res.status(400).json({
    //         message: "Please provide all fields"
    //     })
    // }

    const {error} = signupValidate.validate({
        username,
        email,
        password
    })
    
    if(error) {
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    const existingUser = await userModels.findOne({email})

    if(existingUser) {
        return res.status(400).json ({
            message: `User with ${email} already exists, login instead or create a new account.`
        })
    }



    const newUser = await userModels.create({
        username,
        email,
        password
    })

    const token = await generateToken(newUser._id)

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 1000 * 60 * 60 * 24 * 7
    })

    res.status(201).json({
        message: "User created",
        data: newUser
    })

}



export const loginUser = async  (req, res) => {
    try{     
    const {email, password} = req.body

    const {error} = loginValidate.validate ({
        email,
        password
    })

    if (error){
        return res.status(400).json({
            message: error.details[0].message
        })
    }

    const existingUser = await userModels.findOne ({email})

    if(!existingUser){
        return res.status (404).json({
            message: `User with ${email} does not exist. Signup instead.`
        })
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordValid) {
        return res.status(401).json ({
            message: "Invalid credentials. Try again."
        })
    }

    const refinedUser = {
        username: existingUser.username,
        email: existingUser.email,
    }

    return res.status(200).json ({
        message: "Login successful.",
        data: refinedUser
    })

    } catch(error) {
        console.error(error)
        throw new Error(error)
    }

}

export const signleUser = async (req, res) => {
    try{
        const {id} = req.params
        const user = await userModels.findById(id).select("-password")

        if(!user) {
            return res.status(404).json({
                message: `User with id:${id} does not exist.`
            })
        }

        return res.status(200).json({
            message: "User found",
            data: user
        })

    }catch(error){
        console.error(error)
        throw new Error(error)
    }
}

export const deleteUser = async (req, res) => {
    try{
        const {id} = req.params
        const deletedUser = await userModels.findByIdAndDelete(id)

        if(!deletedUser) {
            return res.status(404).json({
                message: `User with id:${id} does not exist.`
            })
        }

        return res.status(200).json({
            message: "User deleted"
        })
    }catch(error){
        console.error(error)
        throw new Error(error)
    }
}