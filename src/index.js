
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv"
dotenv.config()

const app = express();

const PORT = 3000;

await connectDB(process.env.MONGODB_URI)

app.use(express.json())
app.use("/api", userRoutes)

const start = async () => {
    const uri = process.env.MONGODB_URI
    if (!uri || uri.includes("<db_password>")) {
        console.error("MONGODB_URI is missing or still contains <db_password> placeholder. Update .env and retry.")
        process.exit(1)
    }
    try {
        await connectDB(uri)
        console.log("MongoDB connected")
    } catch (err) {
        console.error("MongoDB connection failed:", err.message)
        process.exit(1)
    }
}

start()

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}/api`)
});