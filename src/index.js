
import express from "express";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const app = express();

const PORT = 3000;

mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Database connected successfully"))
.catch((err) => console.error(err))

app.use(express.json())
app.use("/api", userRoutes)

app.listen(PORT, () => {

    console.log(`Server is running on http://localhost:${PORT}/api`)
});