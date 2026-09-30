



import mongoose from "mongoose";
import bcrypt from "bcryptjs";

 const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next()

        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(this.password, salt)

        this.password = hashedPassword
})

export const userModels = mongoose.model("User", userSchema)