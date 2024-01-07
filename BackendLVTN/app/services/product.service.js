const con = require("../../database");
let instance = null;

class ProductService {
    static getProductInstance() {
        return instance ? instance : new ProductService();
    }    

    insertNewProduct(proItem) {           
        const insertId = new Promise((resolve, reject) => {
            const query =
                "INSERT INTO product(pro_name, pro_description, pro_image, pro_price, cate_id, pro_quantity, trademark_id, pro_manufactureDate, pro_expiry) VALUES (?)";
            con.query(query, [proItem], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);     
            })
        });
        return insertId;
    }

    findByNameProduct(pro_name) {
        try {
            const document = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE pro_name LIKE ?";

                con.query(query, [pro_name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                    
                })
            });
            return document;
        } catch (error) {
            console.log(error);
        }
    }

    findByCateProduct(cateId) {
        try {
            const document = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE cate_id = ?";

                con.query(query, [cateId], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                    
                })
            });
            return document;
        } catch (error) {
            console.log(error);
        }
    }

    getAllProduct() {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product ORDER BY pro_id DESC";                

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

    getIdCate(cate_name) {
        try {
            const cateId = new Promise((resolve, reject) => {
                const query = "SELECT cate_id FROM category WHERE cate_name = ?";

                con.query(query, [cate_name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);                 
                })
            })            
            return cateId;
        } catch (error) {
            console.log(error)
        }
    }

    getSuggestProduct(cate_id, pro_id) {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE cate_id = ? AND pro_id != ?";

                con.query(query, [cate_id, pro_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    advanceProduct(cate_name) {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE cate_id = (SELECT cate_id FROM category WHERE cate_name = ?)";

                con.query(query, [cate_name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                })
            })            
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    getProductByCate(cate_id) {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE cate_id = ?";

                con.query(query, [cate_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results)
                })
            })            
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    filterProductByCate(cateid) {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE cate_id = ?";

                con.query(query, [cateid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    filterProductByTCate(tcateid) {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE cate_id IN (SELECT cate_id FROM category WHERE typecate_id = ?)";

                con.query(query, [tcateid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    filterProductTrademark(trademarkIds) {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE pro_trademark IN (?)";
                console.log(trademarkIds)
                con.query(query, [trademarkIds], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    findByIdProduct(id) {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE pro_id = ?";                
                
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

    updateProduct(pro_name, pro_description, pro_image, pro_price, cate_id, pro_quantity, trademark_id, pro_manufactureDate, pro_expiry, pro_id) {     
        try {
            const affectedRows = new Promise((resolve, reject) => {
                const query = "UPDATE product SET pro_name=?, pro_description=?, pro_image=?,  pro_price=?, cate_id=?, pro_quantity=?, trademark_id=?, pro_manufactureDate=?, pro_expiry=? WHERE pro_id=?";                
                
                con.query(query, [pro_name, pro_description, pro_image, pro_price, cate_id, pro_quantity, trademark_id, pro_manufactureDate, pro_expiry, pro_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);                
                })
            });        
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    updateQuantityProduct(pro_quantity, pro_id) {
        try {
            const affectedRows = new Promise((resolve, reject) => {
                const query = "UPDATE product SET pro_quantity=pro_quantity-? WHERE pro_id=?";
    
                con.query(query, [pro_quantity, pro_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    updateProductHot(pro_id, pro_hot) {
        try {
            const affectedRows = new Promise((resolve, reject) => {
                const query = "UPDATE product SET pro_hot = ? WHERE pro_id = ?";

                con.query(query, [pro_hot, pro_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);                            
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    deleteProduct(id) {
        try {            
            const res = new Promise((resolve, reject) => {
                const query = "DELETE FROM product WHERE pro_id = ?";                
                
                con.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res.affectedRows;
        } catch (error) {
            console.log(error);
        }
    }

    hotProduct() {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM product WHERE pro_hot = 1";

                con.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    remainingProducts() {
        try {
            const res = new Promise((resolve, reject) => {
                const query = 
                "SELECT * FROM product p, category c, trademarks tm WHERE p.cate_id = c.cate_id AND p.trademark_id = tm.trademark_id";

                con.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));                    
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ProductService;