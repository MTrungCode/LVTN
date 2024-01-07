const con = require("../../database");
let instance = null;

class AuthService {
    static getAuthInstance() {
        return instance ? instance : new AuthService();
    }

    async checkEmail(email) {
        const checkSignup = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE email = ?";

            con.query(query, [email], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        return checkSignup;
    }    

    async registerNewUser(user) {           
        const insertId = await new Promise((resolve, reject) => {
            const query =
                "INSERT INTO users(username, email, password, gender, birthday, phone) VALUES (?)";                
            con.query(query, [user], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);
                              
            })
        });
        return insertId;
    }

    async getAllUsers() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users";

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

    async findByUserId(user_id) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE user_id = ?";

                con.query(query, [user_id], (err, results) => {
                    if (err) reject(new Error(err.message))
                    resolve(results)
                })
            })
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    async updateUserInfo(username, email, gender, birthday, phone, avatar, user_id) {
        try {            
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE users SET username = ?, email = ?, gender = ?, birthday = ?, phone = ?, avatar = ? WHERE user_id = ?";

                con.query(query, [username, email, gender, birthday, phone, avatar, user_id], (err, results) => {
                    if (err) reject(new Error(err.message));                                           
                    resolve(results.affectedRows);
                })
            })
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }

    async updatePointUser(listId) {
        try {            
            const affectedRows = await new Promise((resolve, reject) => {
                const query = "UPDATE users SET pointsEG = 0 WHERE user_id ALL ?";

                con.query(query, [listId], (err, results) => {
                    if (err) reject(new Error(err.message));                                           
                    resolve(results.affectedRows);
                })
            })
            return affectedRows;
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = AuthService;