import jwt from "jsonwebtoken";
var pool = require("../db");

export const createContact = {
  path: "/api/creatcon/:userid",
  method: "post",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { userid } = req.params;

    const { contactphone, contactname } = req.body;

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
      if (id != userid) {
        return res.status(403).json({ message: "action not allowed" });
      }
      const contacts = await pool.query(
        "INSERT INTO contacts (contactphone,contactname,user_id) VALUES($1, $2, $3) RETURNING*",
        [contactphone, contactname, userid]
      );
      res.status(200).json(contacts.rows[0]);
      //   insert the contact and send it back
    });
  },
};
