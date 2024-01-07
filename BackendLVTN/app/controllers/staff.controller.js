const StaffService = require("../services/staff.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.addStaff = async (req, res) => {    
    if (req.body[3] !== req.body[4]) {
        return res.status(400).send("Mật khẩu không giống nhau");
    }

    try {
        const db = StaffService.getStaffInstance();
        const check = await db.checkEmail(req.body[1]);
        if (check.length > 0) return res.status(409).send("Email đã được đăng ký!");
        const result = await db.registerNewStaff([
            req.body[0],
            req.body[1],
            req.body[2],     
            bcrypt.hashSync(req.body[3], 10),
        ]);
        if (result) return res.send("Thêm mới thành công!")
    } catch (error) {        
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

exports.updateInfo = async (req, res) => {
    if (!req.body[0]) {
        return res.status(400).send("Tên người dùng không được bỏ trống");
    }
    if (!req.body[1]) {
        return res.status(400).send("Email không được bỏ trống");
    }
    if (!req.body[2]) {
        return res.status(400).send("Số điện thoại không được bỏ trống");
    }

    try {
        const db = StaffService.getStaffInstance();
        const check = await db.checkEmail(req.body[1]);
        if (check.length > 0) return res.status(409).send("Email đã được đăng ký!");
        const result = await db.registerNewStaff([
            req.body[0],
            req.body[1],
            req.body[2],            
        ]);
        if (result) return res.send("Cập nhật thành công!")
    } catch (error) {        
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

exports.changePassword = async (req, res) => {
    if (!req.body[0]) {
        return res.status(400).send("Tên người dùng không được bỏ trống");
    }
    if (!req.body[1]) {
        return res.status(400).send("Email không được bỏ trống");
    }
    if (!req.body[2]) {
        return res.status(400).send("Số điện thoại không được bỏ trống");
    }

    try {
        const db = StaffService.getStaffInstance();
        const check = await db.checkEmail(req.body[1]);
        if (check.length > 0) return res.status(409).send("Email đã được đăng ký!");
        const result = await db.registerNewStaff([
            req.body[0],
            req.body[1],
            req.body[2],            
        ]);
        if (result) return res.send("Cập nhật thành công!")
    } catch (error) {        
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

exports.login = async (req, res) => {
    if (!req.body.sta_email) {
        return res.status(400).send("Email không được bỏ trống");
    }
    if (!req.body.sta_password) {
        return res.status(400).send("Mật khẩu không được bỏ trống");
    }
    if (!req.body) {
        return res.status(400).send("Vui lòng nhập thông tin đăng nhập");
    }

    try {
        const db = StaffService.getStaffInstance();        
        const data = await db.checkEmail(req.body.sta_email);        
        if (data.length === 0) return res.status(404).send(`Không tìm thấy người dùng!`);
        let passwordIsValid = bcrypt.compare(req.body.sta_password, data[0].sta_password);
        if (!passwordIsValid)
            return res.status(404).send("Mật khẩu không đúng!");
        const token = jwt.sign({ id: data[0].sta_id }, process.env.SECRETKEY)
        const { password, ...other } = data[0]        

        return res.send([other, token]);
    } catch (error) {            
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

exports.logout = async (req, res) => {
    res.send("Người quản trị đã đăng xuất.");
}

exports.getAll = async (req, res) => {
    let staffs = [];

    try {
        const db = StaffService.getStaffInstance();
        staffs = await db.getAllStaffs(); 
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
    return res.send(staffs);
}

exports.update = async (req, res) => {
    try {
        const db = StaffService.getStaffInstance();
        const result = await db.updateStaff(
            req.body.staName,
            req.body.staEmail,
            req.body.staPhone,
            req.params.id
        );        
        if (!result) return res.status(404).send("Không tìm thấy nhân viên");
        return res.send("Cập nhật thành công");
    } catch (error) {        
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
}

exports.updateAuthority = async (req, res) => {

    try {
        const db = StaffService.getStaffInstance();        
        const result = await db.updateAuthorityStaff(
            req.params.id,
            req.body[0],
        )        
        if (result)
            return res.send("Cập nhật thành công");
    } catch (error) {        
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
}