const mysql = require("mysql");
let instance = null;
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

class Database {
    static getDatabaseInstance() {
        return instance ? instance : new Database();
    }    

    async insertNewProduct(name, description, price, thumbar) {           
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO products(name, description, price, thumbar) VALUES (?, ?, ?, ?);";                
            
            con.query(query, [name, description, price, thumbar], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);
            })
        });
        return insertId;
    }

    async getAllProduct() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM products;";                

                con.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async findByNameProduct(name) {
        try {
            const document = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM products WHERE name LIKE ?;";

                con.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return document;
        } catch (error) {
            console.log(error);
        }
    }

    async findByIdProduct(id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM products WHERE id = ?;";                
                
                con.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);       
        }
    }

    async deleteProduct(id) {
        try {            
            const res = await new Promise((resolve, reject) => {
                const query = "DELETE FROM products WHERE id = ?;";                
                
                con.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, name, description, price) {
        try {         
            const updateId = await new Promise((resolve, reject) => {
                const query = "UPDATE products SET name=?, description=?, price=? WHERE id = '" + id +"'";                

                con.query(query, [name, description, price], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.updateId);                  
                })
            });
            
            return updateId;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Database;