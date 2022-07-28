import jwt from "jsonwebtoken";
var pool = require("../db");

export const deleteContact = {
  path: "/api/deletecon/:id",
  method: "post",
  handler: async (req, res) => {
    const { authorization } = req.headers;
    const { id } = req.params;
    const { userid } = req.body;

    await pool.query("DELETE FROM contacts WHERE id = $1", [id]);
    const contacts = await pool.query(
      "SELECT * FROM contacts WHERE user_id=$1",
      [userid]
    );
    res.status(200).json(contacts.rows[0]);
  },
};
