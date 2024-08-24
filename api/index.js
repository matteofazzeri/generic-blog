import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";

import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import test from "./routes/create-test-table.js";

dotenv.config();

const app = express();
const port = 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? 'https://erikasblog.vercel.app' : 'http://localhost:3000', // Allow this origin
  credentials: true, // Enable cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}));

app.use(cookieParser());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../client/public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
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
app.use("/test", test);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
