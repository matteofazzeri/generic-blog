import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  // Check if the user already exists
  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(
    q,
    [req.body.inputs.email, req.body.inputs.username],
    (err, result) => {
      if (err) {
        console.error("Database query error:", err);
        return res.status(500).send({ message: "Internal Server Error" });
      }

      if (result.length) {
        return res.status(409).send({ message: "User already exists!" });
      }

      // Hash the password and save the new user
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.inputs.password, salt);

      const q = "INSERT INTO users (username, email, password) VALUES (?)";
      const values = [req.body.inputs.username, req.body.inputs.email, hash];

      db.query(q, [values], (err, result) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).send({ message: "Internal Server Error" });
        }

        return res.status(201).send({ message: "User created successfully" });
      });
    }
  );
};

export const login = (req, res) => {
  // Check if the user exists
  const q = "SELECT * FROM users WHERE username = ? OR email = ?";

  let username = req.body.inputs.username;

  db.query(q, [username, username], (err, result) => {
    if (err) return res.status(500).send({ message: "Internal Server Error" });

    if (!result.length) {
      return res.status(404).send({ message: "User not found!" });
    }

    // Check if the password is correct
    const user = result[0];
    const validPassword = bcrypt.compareSync(
      req.body.inputs.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).send({ message: "Wrong username or password!" });

    const { password, ...info } = user;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(info);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.");
};
