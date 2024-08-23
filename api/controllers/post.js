import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat = ?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    return res.status(200).send(result);
  });
};

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, p.img, u.img as user_img, `cat`, `date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(500).send({ message: err.message });
    return res.status(200).send(result[0]);
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Token is not valid!" });

    const { title, desc, img, cat } = req.body;

    const q = "INSERT INTO posts (title, `desc`, img, cat, uid) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [title, desc, img, cat, user.id], (err, result) => {
      if (err) return res.status(500).send({ message: err.message });
      return res.status(200).send({ message: "Post has been added" });
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.access_token;

  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Token is not valid!" });

    const postId = req.params.id;

    const q = "DELETE FROM posts WHERE id = ? AND uid = ?";

    db.query(q, [postId, user.id], (err, result) => {
      if (err) return res.status(500).send({ message: err.message });
      if (result.affectedRows === 0)
        return res
          .status(403)
          .send({ message: "You can delete only your posts!" });
      return res.status(200).send({ message: "Post has been deleted" });
    });
  });
};

export const updatePost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).send({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send({ message: "Token is not valid!" });

    const postId = req.params.id;
    const { title, desc, img, cat } = req.body;

    const q = "UPDATE posts SET title = ?, `desc` = ?, img = ?, cat = ? WHERE id = ? AND uid = ?";

    db.query(q, [title, desc, img, cat, postId, user.id], (err, result) => {
      if (err) return res.status(500).send({ message: err.message });
      if (result.affectedRows === 0)
        return res
          .status(403)
          .send({ message: "You can update only your posts!" });
      return res.status(200).send({ message: "Post has been updated" });
    });
  });
};
