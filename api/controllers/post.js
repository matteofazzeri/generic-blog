import jwt from "jsonwebtoken";

import { sql } from '@vercel/postgres';


export const getPosts = async (req, res) => {
  try {
    const category = req.query.cat;
    const query = category
      ? sql`SELECT * FROM posts WHERE category = ${category}`
      : sql`SELECT * FROM posts`;


    const { rows } = await query;
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


export const getPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const query = sql`
      SELECT p.id, username, title, description, p.img, u.img as user_img, category, created_at
      FROM users u
      JOIN posts p ON u.id = p.uid
      WHERE p.id = ${postId}
    `;

    const { rows } = await query;
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addPost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const { title, desc, img, cat } = req.body;

    await sql`
      INSERT INTO posts (title, description, img, category, uid)
      VALUES (${title}, ${desc}, ${img}, ${cat}, ${user.id})
    `;

    return res.status(200).json({ message: "Post has been added" });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const postId = req.params.id;

    const { rowCount } = await sql`
      DELETE FROM posts
      WHERE id = ${postId} AND uid = ${user.id}
    `;

    if (rowCount === 0) {
      return res.status(403).json({ message: "You can delete only your posts!" });
    }

    return res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    return res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const token = req.cookies.access_token;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const postId = req.params.id;
    const { title, desc, img, cat } = req.body;

    const { rowCount } = await sql`
      UPDATE posts
      SET title = ${title}, description = ${desc}, img = ${img}, category = ${cat}
      WHERE id = ${postId} AND uid = ${user.id}
    `;

    if (rowCount === 0) {
      return res.status(403).json({ message: "You can update only your posts!" });
    }

    return res.status(200).json({ message: "Post has been updated" });
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: "Token is not valid!" });
    }
    return res.status(500).json({ message: error.message });
  }
};
