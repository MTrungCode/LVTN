const con = require("../../database");
let instance = null;

class CategoryService {
    static getCategoryInstance() {
        return instance ? instance : new CategoryService();
    }    

    async insertNewCate(cateItem) {  
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO category(cate_name, typecate_id) VALUES (?)";             
            
            con.query(query, [cateItem], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);                
            })
        });
        return insertId;
    }

    async findByNameCategory(cate_name) {
        try {
            const document = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Category WHERE cate_name LIKE ?";

                con.query(query, [cate_name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return document;
        } catch (error) {
            console.log(error);
        }
    }

    async getAllCategory() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query =
                    "SELECT *, cate.created_at, cate.updated_at FROM Category cate, typecategory typecate WHERE cate.typecate_id = typecate.typecate_id ORDER BY cate_id DESC";                

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

    async getCategoryByTypeCate(typecateId, cateId) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Category WHERE typecate_id = ? AND cate_id != ?";

                con.query(query, [typecateId, cateId], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async getAllCategoryByTCate(typecateId) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Category WHERE typecate_id = ?";

                con.query(query, [typecateId], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async findByIdCategory(cate_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Category WHERE cate_id = ?";                
                
                con.query(query, [cate_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);       
        }
    }

    async updateCategory(cate_id, cate_name, cate_type) {
        try {         
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE Category SET cate_name=?, cate_type=? WHERE cate_id=?;";                

                con.query(query, [cate_name, cate_type, cate_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);                    
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCategoryHot(cate_id, cate_hot) {
        try {         
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE Category SET cate_hot = ? WHERE cate_id = ?";                

                con.query(query, [cate_hot, cate_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);                   
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteCategory(cate_id) {
        try {            
            const res = await new Promise((resolve, reject) => {
                const query = "DELETE FROM Category WHERE cate_id = ?";                
                
                con.query(query, [cate_id], (err, results) => {
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

module.exports = CategoryService;