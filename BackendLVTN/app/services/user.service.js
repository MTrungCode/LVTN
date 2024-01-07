const con = require("../../database");
let instance = null;

class UserService {
    static getUserInstance() {
        return instance ? instance : new UserService();
    }

    async getTurnExchange() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM user_coupons";

                con.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return res;            
        } catch (error) {
            console.log(error)
        }
    }

    async getRanking() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM user_rank ORDER BY current_point DESC";
    
                con.query(query, (err, results) => {
                    if(err) reject(new Error(err.message));                                  
                    resolve(results);
                })
            });      
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async getUserCouponId(user_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM coupons WHERE coupon_id IN (SELECT coupon_id FROM user_coupons WHERE user_id = ?)";

                con.query(query, [user_id], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            })            
            return res;            
        } catch (error) {
            console.log(error)
        }
    }

    async addPointEG(point, user_id) {
        try {            
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE users SET pointsEG = ? WHERE user_id = ?";

                con.query(query, [point, user_id], (err, results) => {
                    if (err) reject(new Error(err.message));                                              
                    resolve(results.affectedRows);
                })
            })
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    async issetUser(user_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT current_point FROM user_rank WHERE user_id = ?";

                con.query(query, [user_id], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);
                })
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async createMonthlyRank(user_rank) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO user_rank(user_id, user_name, current_point) VALUES (?)";

                con.query(query, [user_rank], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results.insertId);
                })
            })
            return insertId;
        } catch (error) {
            console.log(error)
        }
    }

    async updatePointRanking(point, user_id) {
        try {
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE user_rank SET current_point = ? WHERE user_id = ?";

                con.query(query, [point, user_id], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results.affectedRows);
                })
            })
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    async subtractPointEG(point, user_id) {
        try {            
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE users SET pointsEG = ? WHERE user_id = ?";

                con.query(query, [point, user_id], (err, results) => {
                    if (err) reject(new Error(err.message));                                             
                    resolve(results.affectedRows);
                })
            })
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    async issetCoupon(user_id, coupon_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM user_coupons WHERE user_id = ? AND coupon_id = ?";

                con.query(query, [user_id, coupon_id], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results);                    
                })
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async createUserCoupon(user_coupons) {
        try {            
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO user_coupons(user_id, coupon_id, turn_exchange) VALUES (?)";

                con.query(query, [user_coupons], (err, results) => {
                    if(err) reject(new Error(err.message));                    
                    resolve(results.insertId);
                })
            })
            return insertId;
        } catch (error) {
            console.log(error)
        }
    }

    async updateTurnExchange(user_id, coupon_id) {
        try {
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE user_coupons SET turn_exchange += 1 WHERE user_id = ? AND coupon_id = ?";

                con.query(query, [user_id, coupon_id], (err, results) => {
                    if(err) reject(new Error(err.message));
                    resolve(results.affectedRows);
                })
            })
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    async deleteSale(user_id, coupon_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "DELETE FROM user_coupons WHERE user_id = ? AND coupon_id = ?";                
                
                con.query(query, [user_id, coupon_id], (err, results) => {
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

module.exports = UserService;