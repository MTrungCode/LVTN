const con = require("../../database");
let instance = null;

class OrderService {
    static getOrderInstance() {
        return instance ? instance : new OrderService();
    }    

    insertNewOrder(orders) {           
        const insertId = new Promise((resolve, reject) => {
            const query = "INSERT INTO orders(order_items, user_id, order_username, order_email, order_phone, order_address, order_method, order_sales) VALUES (?)";                

            con.query(query, [orders], (err, results) => {                
                if (err) reject(new Error(err.message));
                resolve(results.insertId);                
            })
        });
        return insertId;
    }

    async getAllOrder() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query =
                    "SELECT * FROM orders";             

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

    async findByIdOrder(id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM orders WHERE order_id = ?";                
                
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

    async deleteOrder(id) {
        try {            
            const res = await new Promise((resolve, reject) => {
                const query = "DELETE FROM orders WHERE order_id = ?";                
                
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

    async updateStateOrder(state, id) {
        try {         
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE orders SET order_state = ? WHERE order_id = ?";               

                con.query(query, [state, id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);                    
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error);
        }
    }

    async getOrderByUserId(id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM orders WHERE user_id = ?";

                con.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async getDetailOrder() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT order_items FROM orders";

                con.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            return res;
        } catch (error) {
            console.log(object)
        }
    }

}

module.exports = OrderService;