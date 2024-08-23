import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import multer from "multer";

import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello to Memories API");
});

app.listen(5000, () => {
  console.log("Connected");
});
