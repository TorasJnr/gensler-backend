
import express from "express";
import userRoutes from "./routes/userRoutes.js"
import mongoose from "mongoose";
import { connectDB } from "./db/index.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
import cors from "cors"

dotenv.config()

const app = express();
app.use(cookieParser());

const PORT = 3000

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api", userRoutes)

await connectDB (process.env.MONGODB_URI, { timeoutMs: 15000 })
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
    console.log(`Server is running on port ${PORT}`);
});
