const mysql = require("mysql");
require("dotenv").config();

module.exports.connectDB = () => {
    return new Promise((reso, rej) => {
        const con = mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'myusername',
            password: process.env.DB_PASS || 'mypassword',
            database: process.env.DB_NAME || 'mydb',
        });
        con.connect((err) => {
            if(err) rej(err);
            reso(con);
        });
    });
};

module.exports.closeDB = (con) => {
    console.log('close DB');
    con.destroy();
};