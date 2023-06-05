const express = require("express");
const router = express.Router();
const db = require("../db");
const userQueries = require("../queries/users");

router.get("/", (req, res) => {
  try {
    db.query("SELECT * FROM users ORDER BY id ASC", (error, response) => {
      if (error) {
        return res.status(500).json(error);
      }

      return res.status(200).json(response.rows);
    });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (name.length < 3) {
      return res
        .status(400)
        .json({ error: "Name should have more than 3 characters." });
    }

    if (email.length < 5 || !email.includes("@")) {
      return res.status(400).json({ error: "E-mail is invalid." });
    }

    const query = userQueries.findByEmail(email);
    const alreadyExists = await db.query(query);
    if (alreadyExists.rows[0]) {
      return res.status(403).json({ error: "E-mail already exists." });
    }

    const text = "INSERT INTO users(name, email) VALUES($1, $2) RETURNING *";
    const values = [name, email];
    const createResponse = await db.query(text, values);
    if (!createResponse.rows[0]) {
      return res.status(400).json({ error: "User not created." });
    }
    return res.status(200).json(createResponse.rows[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.put("/", async (req, res) => {
  try {
    const oldEmail = req.headers.email;
    const { name, email } = req.body;

    if (name.length < 3) {
      return res
        .status(400)
        .json({ error: "Name should have more than 3 characters." });
    }

    if (email.length < 5 || !email.includes("@")) {
      return res.status(400).json({ error: "E-mail is invalid." });
    }

    if (oldEmail.length < 5 || !oldEmail.includes("@")) {
      return res.status(400).json({ error: "Old e-mail is invalid." });
    }

    const query = userQueries.findByEmail(oldEmail);
    const alreadyExists = await db.query(query);
    if (!alreadyExists.rows[0]) {
      return res.status(404).json({ error: "E-mail does not exists." });
    }

    const text =
      "UPDATE users SET name=$1, email=$2 WHERE email=$3 RETURNING *";
    const values = [name, email, oldEmail];

    const updateResponse = await db.query(text, values);

    if (!updateResponse.rows[0]) {
      return res.status(400).json({ error: "User not updated." });
    }

    return res.status(200).json(updateResponse.rows[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.delete("/", async (req, res) => {
  try {
    const headerEmail = req.headers.email;
    const { email } = req.body;

    if (email.length < 5 || !email.includes("@")) {
      return res.status(400).json({ error: "E-mail is invalid." });
    }

    if (headerEmail.length < 5 || !headerEmail.includes("@")) {
      return res.status(400).json({ error: "Header is invalid." });
    }

    const query = userQueries.findByEmail(headerEmail);
    const alreadyExists = await db.query(query);
    if (!alreadyExists.rows[0]) {
      return res.status(404).json({ error: "E-mail does not exists." });
    }

    const text = "DELETE FROM users WHERE email=$1 RETURNING *";
    const values = [email];

    const deleteResponse = await db.query(text, values);

    if (!deleteResponse.rows[0]) {
      return res.status(400).json({ error: "User not deleted." });
    }

    return res.status(200).json(deleteResponse.rows[0]);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
