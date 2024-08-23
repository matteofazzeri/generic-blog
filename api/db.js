import mysql from "mysql2";

export const db = mysql.createConnection({
  host: "192.168.1.102", // Only the IP address or hostname here
  port: 3306, // Specify the port number separately
  user: "matteof",
  password: "1234567890",
  database: "blog",
});
