const con = require("../../database");
let instance = null;

class ProductService {
    static getProductInstance() {
        return instance ? instance : new ProductService();
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

    async updateProduct(id, name, description, price, thumbar) {
        try {         
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE products SET name=?, description=?, price=?, thumbar=? WHERE id=?;";                

                con.query(query, [name, description, price, thumbar, id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);
                    console.log(results.affectedRows);
                })
            });
            return affectedRows;
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

}

module.exports = ProductService;