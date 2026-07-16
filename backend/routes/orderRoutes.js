const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", (req, res) => {

  const {
    customer_name,
    phone,
    address,
    city,
    pincode,
    products,
    total_price
  } = req.body;

  const sql = `
    INSERT INTO orders
    (customer_name, phone, address, city, pincode, products, total_price)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      customer_name,
      phone,
      address,
      city,
      pincode,
      JSON.stringify(products),
      total_price
    ],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Order placed successfully"
      });

    }
  );

});

module.exports = router;