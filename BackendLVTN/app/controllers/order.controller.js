const OrderService = require("../services/order.service");
const request = require('request');
const config = require("../config");
const moment = require("moment");

exports.create = async (req, res) => {

    try {
        const db = OrderService.getOrderInstance();
        const result = await db.insertNewOrder(req.body);

        return res.send(["Tạo mới đơn hàng thành công", result]);
    } catch (error) {
        return res.status(500).send("Lỗi xảy ra khi tạo mới đơn hàng")
    }
}

exports.findAll = async (req, res) => {
    let results = [];
    try {
        const db = OrderService.getOrderInstance();
        results = await db.getAllOrder();
    } catch (error) {
        return res.status(500).send("Lỗi truy xuất đơn hàng");
    }

    return res.send(results);
}

exports.findOne = async (req, res) => {
    
    try {
        const db = OrderService.getOrderInstance();
        const result = await db.findByIdOrder(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy đơn hàng");
        }
        return res.send(result);
    } catch (error) {
        return res.status(500).send("Lỗi truy xuất đơn hàng");
    }
}

exports.delete = async (req, res) => {
    
    try {
        const db = OrderService.getOrderInstance();
        const result = await db.deleteOrder(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy đơn hàng");
        }
        return res.send("Xóa đơn hàng thành công");
    } catch (error) {
        return res.status(500).send(`Không thể xóa đơn hàng có id=${req.params.id}`);
    }
}

exports.updateState = async (req, res) => {
    
    try {
        const db = OrderService.getOrderInstance();
        const result = await db.updateStateOrder(req.body[0], req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy đơn hàng");
        }
        return res.send("Cập nhật đơn hàng thành công");
    } catch (error) {        
        return res.status(500).send(`Không thể xóa đơn hàng có id=${req.params.id}`);
    }
}

exports.getHistoryOrder = async (req, res) => {
    let result = []
    try {
        const db = OrderService.getOrderInstance();
        result = await db.getOrderByUserId(req.params.userid);
    } catch (error) {        
        return res.status(500).send(`Lỗi truy xuất đơn hàng của người dùng có id=${req.params.userid}`);
    }

    return res.send(result);
}

exports.getDetail = async (req, res) => {
    let result = [];
    try {
        const db = OrderService.getOrderInstance();
        result = await db.getDetailOrder();
    } catch (error) {
        return res.status(500).send("Lỗi truy xuất chi tiết đơn hàng");
    }

    return res.send(result);
}