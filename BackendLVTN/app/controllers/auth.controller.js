const AuthService = require("../services/auth.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    if (!req.body?.username) {
        return res.status(400).send("Tên người không được để trống");
    }
    if (!req.body?.email) {
        return res.status(400).send("Email không được để trống");
    }
    if (!req.body?.password) {
        return res.status(400).send("Mật khẩu không được để trống");
    }

    try {
        const db = AuthService.getAuthInstance();
        const check = await db.checkEmail(req.body.email);
        if (check.length > 0) return res.status(409).send("Email đã được đăng ký!");
        const result = await db.registerNewUser([
            req.body.username,
            req.body.email,
            bcrypt.hashSync(req.body.password, 10),
            req.body.gender,
            req.body.birthday,
            req.body.phone,            
        ]);
        if (result) return res.send("Đăng ký tài khoản thành công!")
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

exports.login = async (req, res) => {
    if (!req.body?.email) {
        return res.status(400).send("Email không được để trống");
    }
    if (!req.body?.password) {
        return res.status(400).send("Mật khẩu không được để trống");
    }

    try {
        const db = AuthService.getAuthInstance();
        const data = await db.checkEmail(req.body.email);
        if (data.length === 0) return res.status(404).send(`Không tìm thấy người dùng ${req.body.email}!`);
        let passwordIsValid = bcrypt.compareSync(req.body.password, data[0].password);
        if (!passwordIsValid)
            return res.status(404).send("Email hoặc mật khẩu không đúng!");
        const token = jwt.sign({ id: data[0].id }, process.env.SECRETKEY);
        const { password, ...other } = data[0];  
        
        res.send([other, token]);
    } catch (error) {        
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

exports.logout = async (req, res) => {
    res.send("Người dùng đã đăng xuất.");
}

exports.getAll = async (req, res) => {
    let users = [];

    try {
        const db = AuthService.getAuthInstance();
        users = await db.getAllUsers(); 
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
    return res.send(users);
}

exports.findOne = async (req, res) => {
    try {
        const db = AuthService.getAuthInstance();        
        const result = await db.findByUserId(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy người dùng");
        }
        return res.send(result);
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
}

exports.updateInfo = async (req, res) => {
    try {
        const db = AuthService.getAuthInstance();                 
        const result = await db.updateUserInfo(
            req.body.username,
            req.body.email,
            req.body.gender,
            req.body.birthday,
            req.body.phone,
            req.body.avatar,
            req.params.id
        );        
        if (!result) {
            return res.status(404).send("Không tìm thấy người dùng!");
        }
        return res.send("Cập nhật thông tin thành công");
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
}

exports.resetPoint = async (req, res) => {
    try {
        const db = AuthService.getAuthInstance();                 
        const result = await db.updatePointUser(
            req.body.listId,            
        );        
        if (!result) {
            return res.status(404).send("Không tìm thấy người dùng!");
        }
        return res.send("Reset điểm thành công");
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
}