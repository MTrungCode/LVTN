const con = require("../../database");
let instance = null;

class TransactionService {
    static getTransactionInstance() {
        return instance ? instance : new TransactionService();
    }    

    insertNewTransaction(transactions) {         
        const insertId = new Promise((resolve, reject) => {
            const query = "INSERT INTO transactions(order_id, tran_username, tran_pay, tran_total, tran_state) VALUES (?)";                
            
            con.query(query, [transactions], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);                
            })
        });
        return insertId;
    }

    getAllTransaction() {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM transactions";             

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

    findByNameTransaction(name) {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM transactions WHERE tran_username LIKE ?";                
                
                con.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error);       
        }
    }

    findByIdTransaction(id) {
        try {
            const res = new Promise((resolve, reject) => {
                const query = "SELECT * FROM transactions WHERE tran_id = ?";                
                
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

    updateTransactionState(id, state) {
        try {
            const affectedRows = new Promise((resolve, reject) => {
                const query = "UPDATE transactions SET tran_state = ? WHERE tran_id = ?";

                con.query(query, [state, id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    deleteTransaction(id) {
        try {            
            const res = new Promise((resolve, reject) => {
                const query = "DELETE FROM transactions WHERE tran_id = ?";                
                
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

module.exports = TransactionService;