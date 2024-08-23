import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sql } from '@vercel/postgres';

export const register = async (req, res) => {
  try {
    // Check if the user already exists
    const { email, username, password } = req.body.inputs;
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email} OR username = ${username};
    `;

    if (existingUser.length > 0) {
      return res.status(409).send({ message: "User already exists!" });
    }

    // Hash the password and save the new user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    await sql`
      INSERT INTO users (username, email, password) 
      VALUES (${username}, ${email}, ${hash});
    `;

    return res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.error("Database query error:", err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    // Check if the user exists
    const { username, password } = req.body.inputs;
    const users = await sql`
      SELECT * FROM users WHERE username = ${username} OR email = ${username};
    `;

    if (users.length === 0) {
      return res.status(404).send({ message: "User not found!" });
    }

    // Check if the password is correct
    const user = users.rows[0];

    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword)
      return res.status(401).send({ message: "Wrong username or password!" });

    const { password: _, ...info } = user;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
      })
      .status(200)
      .json(info);
  } catch (err) {
    return res.status(500).send({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  })
    .status(200)
    .json("User has been logged out.");
};
