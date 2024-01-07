const con = require("../../database");
let instance = null;

class StaffService {
    static getStaffInstance() {
        return instance ? instance : new StaffService();
    }

    async checkEmail(email) {
        const checkSignup = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM staffs WHERE sta_email = ?";

            con.query(query, [email], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        return checkSignup;
    }    

    async registerNewStaff(staff) {           
        const insertId = await new Promise((resolve, reject) => {
            const query =
                "INSERT INTO staffs(sta_name, sta_email, sta_phone, sta_password) VALUES (?)";                
            con.query(query, [staff], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);
            })
        });
        return insertId;
    }

    async getAllStaffs() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM staffs";

                con.query(query, (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async updateStaff(sta_name, sta_email, sta_phone, id) {
        try {
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE staffs SET sta_name=?, sta_email=?, sta_phone=? WHERE sta_id = ?";

                con.query(query, [sta_name, sta_email, sta_phone, id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);
                });
            });
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    async updateAuthorityStaff(id, sta_isadmin) {
        try {
            const affectedRows = await new Promise((resolve, reject) => {                
                const query = "UPDATE staffs SET sta_isadmin=? WHERE sta_id = ?";

                con.query(query, [sta_isadmin, id], (err, results) => {
                    if (err) reject(new Error(err.message));
                
                    resolve(results.affectedRows);
                })
            });
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = StaffService;