const con = require("../../database");
let instance = null;

class UserService {
    static getUserInstance() {
        return instance ? instance : new UserService();
    }    

    async selectByEmail(email) {
        const user = await new Promise((resolve, reject) => {
            const query = "SELECT * FROM users WHERE email = ?;";

            con.query(query, [email], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results);
            })
        });
        return user;
    }

    async registerNewUser(user) {           
        const insertId = await new Promise((resolve, reject) => {
            const query =
                "INSERT INTO users(username, email, password, gender, birthday, phone) VALUES (?, ?, ?, ?, ?, ?);";                
            
            con.query(query, [user], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);                
            })
        });
        return insertId;
    }

    async registerAdmin(user) {           
        const insertId = await new Promise((resolve, reject) => {
            const query =
                "INSERT INTO users(username, email, password, gender, birthday, phone, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?);";                
            
            con.query(query, [user], (err, results) => {
                if (err) reject(new Error(err.message));
                resolve(results.insertId);                
            })
        });
        return insertId;
    }
}

module.exports = UserService;