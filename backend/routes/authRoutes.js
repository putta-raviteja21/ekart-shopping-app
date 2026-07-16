const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const db = require("../config/db");


// REGISTER

router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  try {

    // Encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users(name,email,password) VALUES(?,?,?)";

    db.query(
      sql,
      [name, email, hashedPassword],
      (err, result) => {

        if (err) {
          return res.send(err);
        }

        res.send("User Registered Successfully");

      }
    );

  }

  catch (error) {

    res.status(500).send(error);

  }

});


// LOGIN

router.post("/login", (req, res) => {

  const { email, password } = req.body;

  const sql =
    "SELECT * FROM users WHERE email=?";

  db.query(sql, [email], async (err, result) => {

    if (err) {

      return res.send(err);

    }

    if (result.length === 0) {

      return res.send("Invalid Email or Password");

    }

    const user = result[0];

    const isMatch =
      await bcrypt.compare(password, user.password);

    if (isMatch) {

      res.send("Login Successful");

    }

    else {

      res.send("Invalid Email or Password");

    }

  });

});

module.exports = router;