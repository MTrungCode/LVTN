const con = require("../../database");
let instance = null;

class TradeMarkService {
    static getTradeMarkInstance() {
        return instance ? instance : new TradeMarkService();
    }    

    async insertTrademark(trademark_name) {  
        const insertId = await new Promise((resolve, reject) => {
            const query = "INSERT INTO trademarks(trademark_name) VALUES (?)";            

            con.query(query, [trademark_name], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);                            
            })
        });
        return insertId;
    }

    async getAllTrademark() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM trademarks";            

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

    async getTrademarkFromCate(cateid) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM trademarks WHERE trademark_id IN (SELECT trademark_id FROM product WHERE cate_id = ?)";            

                con.query(query, [cateid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async getTrademarkFromTCate(tcateid) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query =
                "SELECT * FROM trademarks WHERE trademark_id IN (SELECT trademark_id FROM product WHERE cate_id IN (SELECT cate_id FROM category WHERE typecate_id = ?))";            

                con.query(query, [tcateid], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async findByIdtrademark(trademark_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM trademarks WHERE trademark_id = ?";                
                
                con.query(query, [trademark_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);       
        }
    }

    async updateTrademark(trademark_id, trademark_name) {
        try {         
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE Trademarks SET trademark_name = ? WHERE trademark_id = ?";                

                con.query(query, [trademark_name, trademark_id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);                    
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteTrademark(trademark_id) {
        try {            
            const res = await new Promise((resolve, reject) => {
                const query = "DELETE FROM trademarks WHERE trademark_id = ?";                
                
                con.query(query, [trademark_id], (err, results) => {
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

module.exports = TradeMarkService;