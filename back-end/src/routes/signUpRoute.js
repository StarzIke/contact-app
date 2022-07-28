import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { users } from "./usersTest";
var pool = require("../db");

export const getallUsers = {
  path: "/api/users",
  method: "post",
  handler: async (req, res) => {
    res.status(200).json({ users });
  },
};
export const signUpRoute = {
  path: "/api/signup",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    // check if user exit in the database

    // const user = userExists(email);
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (user["rows"].length > 0) {
      // conflict error code
      return res.sendStatus(409);
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const newuser = await pool.query(
      "INSERT INTO users (email,password) VALUES($1, $2) RETURNING*",
      [email, passwordHash]
    );

    jwt.sign(
      {
        id: newuser.rows[0]["id"],
        email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) {
          return res.status(500).send(err);
        }
        res.status(200).json({ token });
      }
    );
  },
};
