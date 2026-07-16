const express = require("express");

const router = express.Router();

const db = require("../config/db");


// GET PRODUCTS

router.get("/", (req, res) => {

  const sql = "SELECT * FROM products";

  db.query(sql, (err, result) => {

    if(err){

      console.log(err);

      return res.status(500).send(err);

    }

    res.send(result);

  });

});


// ADD PRODUCT

router.post("/", (req, res) => {

  const {

    brand,
    model,
    title,
    description,
    price,
    image,
    category,
    stock,
    rating

  } = req.body;

  const sql = `

    INSERT INTO products

    (brand, model, title, description, price, image, category, stock, rating)

    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)

  `;

  db.query(

    sql,

    [

      brand,
      model,
      title,
      description,
      price,
      image,
      category,
      stock,
      rating

    ],

    (err, result) => {

      if(err){

        console.log(err);

        return res.status(500).send(err);

      }

      res.send("Product Added");

    }

  );

});

module.exports = router;