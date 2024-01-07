const con = require("../../database");
let instance = null;

class CommentService {
    static getCommentInstance() {
        return instance ? instance : new CommentService();
    }    

    async insertNewComment(comment) {           
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO comments(user_id, com_content, com_parentId, com_username, pro_id) VALUES (?)";                
            
            con.query(query, [comment], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);
            })
        });              
        return insertId;
    }

    async getAllComment(proid) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM comments WHERE pro_id = ?";             

                con.query(query, [proid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async getContentComment(id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT com_content FROM comments WHERE com_id = ?";

                con.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async findByIdComment(id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM comments WHERE com_id = ?";                
                
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

    async updateComment(content, id) {
        try {         
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE comments SET com_content=? WHERE com_id=?";                

                con.query(query, [content, id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);                  
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteComment(id) {
        try {            
            const res = await new Promise((resolve, reject) => {
                const query = "DELETE FROM comments WHERE com_id = ?";                
                
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

module.exports = CommentService;