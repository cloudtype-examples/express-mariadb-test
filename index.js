const express = require("express");
const mysql = require("mysql2/promise");

(async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: 3306,
        database: "test",
      });
      
      console.log(connection);
})();


const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
