const TradeMarkService = require("../services/trademark.service");

exports.create = async (req, res) => {
    if (!req.body[0]) return res.status(400).send("Tên thương hiệu không được bỏ trống")

    try {
        const db = TradeMarkService.getTradeMarkInstance();
        const result = await db.insertTrademark(req.body[0]);    
        if (result) return res.send("Thêm mới thương hiệu thành công");
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lỗi xảy ra khi tạo mới thương hiệu")
    }
};

exports.findAll = async (req, res) => {
    let results = [];
    
    try {
        const db = TradeMarkService.getTradeMarkInstance();
        results = await db.getAllTrademark();
    } catch (error) {        
        return res.status(500).send("Lỗi truy xuất thương hiệu")
    }
    
    return res.send(results);
};

exports.findOne = async (req, res) => {
    try {
        const db = TradeMarkService.getTradeMarkInstance();    
        const result = await db.findByIdtrademark(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy thương hiệu");
        }
        return res.send(result);
    } catch (error) {
        return res.status(500).send(`Lỗi truy xuất thương hiệu có id=${req.params.id}`)
    }

};

exports.findTrademark_Cate = async (req, res) => {
    let results = [];

    try {
        const db = TradeMarkService.getTradeMarkInstance();                    
        results = await db.getTrademarkFromCate(req.params.cateid);    
    } catch (error) {
        return res.status(500).send("Lỗi truy xuất thương hiệu")
    }

    return res.send(results);
};

exports.findTrademark_Tcate = async (req, res) => {
    let results = [];

    try {
        const db = TradeMarkService.getTradeMarkInstance();                
        results = await db.getTrademarkFromTCate(req.params.tcateid);
    } catch (error) {
        return res.status(500).send("Lỗi truy xuất thương hiệu")
    }

    return res.send(results);
};

exports.update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Dữ liệu cập nhật không được bỏ trống");
    }
    try {
        const db = TradeMarkService.getTradeMarkInstance();        
        const result = await db.updateTrademark(
            req.params.id, req.body[0]
        );
        
        if (!result) {
            return res.status(404).send("Thương hiệu không tìm thấy");
        }
        return res.send("Cập nhật thành công");
    } catch (error) {
        return res.status(500).send(`Lỗi cập nhật thương hiệu có id=${req.params.id}`)
    }
};

exports.delete = async (req, res) => {
    try {
        const db = TradeMarkService.getTradeMarkInstance();    
        const result = await db.deleteTrademark(req.params.id);
        if (!result) {
            return res.status(404).send("Thương hiệu không tìm thấy");
        }
        return res.send( "Xóa thành công");
    } catch (error) {
        return res.status(500).send(`Không thể xóa thương hiệu có id=${req.params.id}`)
    }
};