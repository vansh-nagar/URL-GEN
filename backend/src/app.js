import express, { urlencoded } from "express";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
import DB from "./DB/Db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config({ path: "../.env" });

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);

app.use(
  cors({
    origin: "http://localhost:5173", // Your React frontend
    credentials: true, // Allow cookies to be sent/received
  })
);

DB();

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

app.listen(process.env.PORT);
