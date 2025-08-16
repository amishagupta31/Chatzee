import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";

import { connectDB } from "./lib/db.js";

const app = express();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

 

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow local tools like Postman
    if (origin.includes("https://chatzee-klusvooiv-amishagupta9651-gmailcoms-projects.vercel.app/") || origin === "http://localhost:5173") {
      return callback(null, true);
    }
    return callback(new Error("CORS not allowed"));
  },
  credentials: true
}));



app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
