import express from "express";
import mysql, {
  ConnectionOptions,
  ResultSetHeader,
  RowDataPacket,
} from 'mysql2/promise';


(async () => {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: 3306,
    database: "test",
  });

  await connection.query<ResultSetHeader>("DROP TABLE IF EXISTS `users`;");

  await connection.query<ResultSetHeader>("CREATE TABLE `users` (`id` INT(11) AUTO_INCREMENT, `name` VARCHAR(50), PRIMARY KEY (`id`));");

  const [inserted] = await connection.execute<ResultSetHeader>(
    "INSERT INTO `users`(`name`) VALUES(?), (?), (?), (?);",
    ["Josh", "John", "Marie", "Gween"]
    );
  
    console.log('Inserted:', inserted.affectedRows);

    /** Getting users */
    const [users] = await connection.query(
      'SELECT * FROM `users` ORDER BY `name` ASC;'
    );
  
    users.forEach((user) => {
      console.log('-----------');
      console.log('id:  ', user.id);
      console.log('name:', user.name);
    });
})();

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(3000);
