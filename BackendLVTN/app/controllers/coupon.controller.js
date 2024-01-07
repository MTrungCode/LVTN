const CouponService = require("../services/coupon.service");

exports.create = async (req, res) => {
    try {
        const db = CouponService.getCouponInstance();        
        const result = await db.insertCoupon(req.body);
        if (result) return res.send("Thêm mới thành công");
    } catch (error) {        
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
};

exports.findAll = async (req, res) => {
    let results = [];
    
    try {
        const db = CouponService.getCouponInstance();
        results = await db.getAllCoupon();
    } catch (error) {        
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!")
    }
    
    return res.send(results);
};

exports.findOne = async (req, res) => {
    try {
        const db = CouponService.getCouponInstance();    
        const result = await db.findByIdCoupon(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy phiếu giảm giá!");
        }
        return res.send(result);
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!")
    }

};

exports.update = async (req, res) => {
    try {
        const db = CouponService.getCouponInstance();                    
        const result = await db.updateCoupon(
            req.body.title,
            req.body.value,
            req.body.description,
            req.body.expiries,
            req.body.exchanges,
            req.body.limit,
            req.params.id,
        );
        
        if (!result) {
            return res.status(404).send("Không tìm thấy phiếu giảm giá!");
        }
        return res.send("Cập nhật thành công");
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!")
    }
};

exports.delete = async (req, res) => {
    try {
        const db = CouponService.getCouponInstance();
        const relative = await db.deleteRelative(req.params.id);
        if (!relative) {
            return res.status(404).send("Bạn phải xóa các dữ liệu có liên quan trước!");
        }    
        const result = await db.deleteCoupon(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy phiếu giảm giá!");
        }
        return res.send( "Xóa thành công");
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!")
    }
};