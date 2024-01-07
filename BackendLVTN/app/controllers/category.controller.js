const CategoryService = require("../services/category.service");

exports.create = async (req, res) => {
    if (!req.body[0]) return res.status(400).send("Tên danh mục không được bỏ trống")

    if (!req.body[1]) return res.status(400).send("Loại danh mục không được bỏ trống")

    try {
        const db = CategoryService.getCategoryInstance();        
        const result = await db.insertNewCate(req.body);
        
        if (result) return res.send("Thêm mới danh mục thành công");
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lỗi xảy ra khi tạo mới danh mục")
    }
};

exports.findAll = async (req, res) => {
    let results = [];
    
    try {
        const db = CategoryService.getCategoryInstance();
        results = await db.getAllCategory();
    } catch (error) {        
        return res.status(500).send("Lỗi truy xuất danh mục")
    }
    
    return res.send(results);
};

exports.findCate = async (req, res) => {
    let results = [];
    
    try {
        const db = CategoryService.getCategoryInstance();        
        results = await db.getCategoryByTypeCate(req.params.typecateid, req.params.cateid);
    } catch (error) {        
        return res.status(500).send("Lỗi truy xuất danh mục");
    }
    
    return res.send(results);
}

exports.findTCate = async (req, res) => {
    let results = [];
    
    try {
        const db = CategoryService.getCategoryInstance();        
        results = await db.getAllCategoryByTCate(req.params.typecateid);
    } catch (error) {        
        return res.status(500).send("Lỗi truy xuất danh mục");
    }
    
    return res.send(results);
}

exports.findOne = async (req, res) => {
    try {
        const db = CategoryService.getCategoryInstance();        
        const result = await db.findByIdCategory(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy danh mục");
        }
        return res.send(result);
    } catch (error) {
        return res.status(500).send(`Lỗi truy xuất danh mục có id=${req.params.id}`)
    }

};

exports.update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Dữ liệu cập nhật không được bỏ trống");
    }
    try {
        const db = CategoryService.getCategoryInstance();        
        const result = await db.updateCategory(
            req.params.id, req.body[0], req.body[1]
        );
        
        if (!result) {
            return res.status(404).send("Danh mục không tìm thấy");
        }
        return res.send("Cập nhật thành công");
    } catch (error) {
        return res.status(500).send(`Lỗi cập nhật danh mục có id=${req.params.id}`)
    }
};

exports.updateHot = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Dữ liệu cập nhật không được bỏ trống");
    }
    try {
        const db = CategoryService.getCategoryInstance();        
        const result = await db.updateCategoryHot(
            req.params.id, req.body[0]
        );
        
        if (!result) {
            return res.status(404).send("Danh mục không tìm thấy");
        }
        return res.send("Cập nhật thành công");
    } catch (error) {
        return res.status(500).send(`Lỗi cập nhật danh mục có id=${req.params.id}`)
    }
};

exports.delete = async (req, res) => {
    try {
        const db = CategoryService.getCategoryInstance();          
        const result = await db.deleteCategory(req.params.id);
        if (!result) {
            return res.status(404).send("Đã xảy ra lỗi, vui lòng thử lại sau!");
        }
        return res.send("Xóa thành công");
    } catch (error) {
        return res.status(500).send(error)
    }
};