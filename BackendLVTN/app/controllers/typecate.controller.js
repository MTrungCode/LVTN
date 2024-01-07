const TypeCateService = require("../services/typecate.service");

exports.create = async (req, res) => {
    if (!req.body[0]) return res.status(400).send("Tên loại danh mục không được bỏ trống")

    try {
        const db = TypeCateService.getTypeCateInstance();
        const result = await db.insertTypeCate(req.body[0]);
        
        if (result) return res.send("Thêm mới loại danh mục thành công");
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lỗi xảy ra khi tạo mới loại danh mục")
    }
};

exports.findAll = async (req, res) => {
    let results = [];
    
    try {
        const db = TypeCateService.getTypeCateInstance();
        results = await db.getAllTypeCate();
    } catch (error) {        
        return res.status(500).send("Lỗi truy xuất loại danh mục")
    }
    
    return res.send(results);
};

exports.findOne = async (req, res) => {
    try {
        const db = TypeCateService.getTypeCateInstance();    
        const result = await db.findByIdTypeCate(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy loại danh mục");
        }
        return res.send(result);
    } catch (error) {
        return res.status(500).send(`Lỗi truy xuất loại danh mục có id=${req.params.id}`)
    }
};

exports.findName = async (req, res) => {
    try {
        const db = TypeCateService.getTypeCateInstance();    
        const result = await db.findNameByTCate(req.params.tcateid);
        if (!result) {
            return res.status(404).send("Tên loại danh mục này không tồn tại");
        }
        return res.send(result);
    } catch (error) {
        return res.status(500).send(`Lỗi truy xuất loại danh mục có id=${req.params.id}`)
    }
};

exports.update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Dữ liệu cập nhật không được bỏ trống");
    }
    try {
        const db = TypeCateService.getTypeCateInstance();        
        const result = await db.updateTypeCate(
            req.params.id, req.body[0]
        );
        
        if (!result) {
            return res.status(404).send("Loại danh mục không tìm thấy");
        }
        return res.send("Cập nhật thành công");
    } catch (error) {
        return res.status(500).send(`Lỗi cập nhật loại danh mục có id=${req.params.id}`)
    }
};

exports.delete = async (req, res) => {
    try {
        const db = TypeCateService.getTypeCateInstance();    
        const result = await db.deleteTypeCate(req.params.id);        
        if (!result) {
            return res.status(404).send("Bạn chưa xóa các danh mục của nhóm danh mục này");
        }
        return res.send( "Xóa thành công");
    } catch (error) {
        return res.status(500).send(`Không thể xóa loại danh mục có id=${req.params.id}`)
    }
};