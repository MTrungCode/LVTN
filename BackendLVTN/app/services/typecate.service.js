const con = require("../../database");
let instance = null;

class TypeCateService {
    static getTypeCateInstance() {
        return instance ? instance : new TypeCateService();
    }    

    async insertTypeCate(typecate_name) {  
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO typecategory(typecate_name) VALUES (?)";             
            
            con.query(query, [typecate_name], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);                
            })
        });
        return insertId;
    }

    async findByNameTypeCate(cate_name) {
        try {
            const document = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM typecategory WHERE cate_name LIKE ?;";

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

    async getAllTypeCate() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM typecategory ORDER BY typecate_id DESC";        

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

    async findByIdTypeCate(typecate_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM typecategory WHERE typecate_id = ?";                
                
                con.query(query, [typecate_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);       
        }
    }

    async findNameByTCate(typecate_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT typecate_name FROM typecategory WHERE typecate_id = ?";                
                
                con.query(query, [typecate_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);       
        }
    }

    async updateTypeCate(typecate_id, typecate_name) {
        const affectedRows = await new Promise((resolve, reject) => {
            const query = "UPDATE typecategory SET typecate_name = ? WHERE typecate_id = ?";                

            con.query(query, [typecate_name, typecate_id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.affectedRows);                    
            })
        });
        return affectedRows;
    }

    async deleteTypeCate(typecate_id) {
        const res = await new Promise((resolve, reject) => {
            const query = "DELETE FROM typecategory WHERE typecate_id = ?";                
            
            con.query(query, [typecate_id], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        return res;
    }    
}

module.exports = TypeCateService;