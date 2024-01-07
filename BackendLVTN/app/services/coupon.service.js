const con = require("../../database");
let instance = null;

class CouponService {
    static getCouponInstance() {
        return instance ? instance : new CouponService();
    }    

    async insertCoupon(coupons) {
        try {
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO coupons(coupon_title, coupon_values, coupon_description, coupon_expiry, exchange_price, exchange_limit) VALUES (?)";            
    
                con.query(query, [coupons], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.insertId);                            
                })
            });
            return insertId;
        } catch (error) {
            console.log(error)
        }
    }

    async getAllCoupon() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM coupons";            

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

    async findByIdCoupon(id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM coupons WHERE coupon_id = ?";                
                
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

    async updateCoupon(coupon_title, coupon_expiry, coupon_description, coupon_values, exchange_price, coupon_id) {
        try {         
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE coupons SET coupon_title = ?, coupon_expiry = ?, coupon_description = ?, coupon_values = ?, exchange_price = ? WHERE coupon_id = ?";                

                con.query(query, [coupon_title, coupon_expiry, coupon_description, coupon_values, exchange_price, coupon_id], (err, results) => {
                    if (err) reject(new Error(err.message));                                
                    resolve(results.affectedRows);
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRelative(id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "DELETE FROM user_coupons WHERE coupon_id = ?";                
                
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

    async deleteCoupon(id) {
        try {            
            const res = await new Promise((resolve, reject) => {
                const query = "DELETE FROM coupons WHERE coupon_id = ? ";                
                
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

module.exports = CouponService;