const mysql = require("mysql");
require("dotenv").config();

const con = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'myusername',
    password: process.env.DB_PASS || 'mypassword',
    database: process.env.DB_NAME || 'mydb',
    port: process.env.DB_PORT || 'port',
});
con.connect((err) => {
    if(err) {
        console.log(err.message);
    }
    console.log('Connected to mySQL database');
});

module.exports = con;