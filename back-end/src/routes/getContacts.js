import jwt from "jsonwebtoken";
var pool = require("../db");

export const getContacts = {
  path: "/api/getallcontacts",
  method: "get",
  handler: async (req, res) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: " not authorization header" });
    }

    // verify the token
    const token = authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "unable to verify to verify token" });
      }
      const { id } = decode;
      if (!id) {
        return res.status(403).json({ message: "action not allowed" });
      }
      const contacts = await pool.query(
        "SELECT * FROM contacts WHERE user_id=$1",
        [id]
      );
      res.status(200).json(contacts.rows);
      //   insert the contact and send it back
    });
  },
};
