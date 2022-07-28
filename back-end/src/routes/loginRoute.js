import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
var pool = require("../db");

export const loginRoute = {
  path: "/api/login",
  method: "post",
  handler: async (req, res) => {
    const { email, password } = req.body;

    // geting the users from the database
    const user = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);

    if (!user["rows"].length > 0) {
      return res.sendStatus(401);
    }
    const databasepassword = user.rows[0]["password"];
    const id = user.rows[0]["id"];
    const iscorrect = await bcrypt.compare(password, databasepassword);
    if (iscorrect) {
      jwt.sign(
        { id, email },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },

        (err, token) => {
          if (err) {
            res.status(500).json(err);
          }
          res.status(200).json({ token });
        }
      );
    } else {
      res.sendStatus(401);
    }
  },
};
