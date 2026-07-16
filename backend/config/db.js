const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "T5j1@2120",
  database: "shopping_app"
});

db.connect((err) => {

  if(err){
    console.log(err);
  }

  else{
    console.log("MySQL Connected");
  }

});

module.exports = db;