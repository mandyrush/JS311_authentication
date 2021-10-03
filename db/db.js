let mysql = require('mysql');
require('dotenv').config();

let connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DATABASE,
    port: process.env.MYSQL_PORT
});

connection.connect();

connection.query(`use ${process.env.MYSQL_DATABASE}`, (error, rows) => {
    if (error) {
        console.log('Failed to connect to database', error);
    } else {
        console.log('Successfully connected to database', rows);
    }
});

module.exports = connection;