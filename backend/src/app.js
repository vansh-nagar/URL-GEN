import express, { urlencoded } from "express";
import userRouter from "./routes/user.route.js";
import dotenv from "dotenv";
import DB from "./DB/Db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config({ path: "../.env" });

app.use(express.json({ limit: "16kb" }));
app.use(urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));
app.use(cookieParser());

app.use(
  cors({
    origin: "https://url-gen-a82n.onrender.com/", // Your React frontend
    credentials: true, // Allow cookies to be sent/received
  })
);

DB();

app.use("/api/v1/users", userRouter);

app.listen(process.env.PORT || 3000);
