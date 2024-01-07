const con = require("../../database");
let instance = null;

class ImportProService {
    static getimportProInstance() {
        return instance ? instance : new ImportProService();
    } 

    importMorePro(proItem) {           
        const insertId = new Promise((resolve, reject) => {
            const query =
                "INSERT INTO import_product(pro_id, import_price, import_quantity) VALUES (?)";
            con.query(query, [proItem], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);     
            })
        });
        return insertId;
    }

    updateQuantityPro(import_quantity, pro_id) {
        const affectedRows = new Promise((resolve, reject) => {
            const query = "UPDATE product SET pro_quantity=pro_quantity+? WHERE pro_id=?";
            
            con.query(query, [import_quantity, pro_id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        return affectedRows;
    }

    async getImport() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM import_product";                

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

    checkRate(user_id, pro_id) {
        const res = new Promise((resolve, reject) => {
            const query = "SELECT * FROM rating_product WHERE user_id = ? AND pro_id = ?";                

            con.query(query, [user_id, pro_id], (err, results) => {
                if (err) reject(new Error(err.message));                    
                resolve(results);
            })
        });
        return res;
    }

    ratingProduct(ratingItem) {
        const insertId = new Promise((resolve, reject) => {
            const query =
                "INSERT INTO rating_product(user_id, pro_id, rating) VALUES (?)";
            con.query(query, [ratingItem], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);     
            })
        });
        return insertId;
    }

    updateRating(rating, user_id, pro_id) {
        const affectedRows = new Promise((resolve, reject) => {
            const query = "UPDATE rating_product SET rating = ? WHERE user_id = ? AND pro_id = ?";
            
            con.query(query, [rating, user_id, pro_id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        return affectedRows;
    }

    getRating() {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM rating_product";          

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
}

module.exports = ImportProService;