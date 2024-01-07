const ImportProService = require("../services/importproduct.service");

exports.importProduct = async (req, res) => {
    try {
        const db = ImportProService.getimportProInstance();
        await db.importMorePro(req.body);
        await db.updateQuantityPro(req.body[2], req.body[0]);
        return res.send("Nhập sản phẩm thành công");
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
}

exports.getAllImport = async (req, res) => {
    let result = [];
    
    try {
        const db = ImportProService.getimportProInstance();        
        result = await db.getImport();        
    } catch (error) {      
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
    return res.send(result);
}

exports.addRating = async (req, res) => {
    try {
        const db = ImportProService.getimportProInstance();
        const checkRating = await db.checkRate(req.body[0], req.body[1]);        
        if (checkRating.length !== 0) {            
            await db.updateRating(
                req.body[2],
                req.body[0],
                req.body[1]
            );
        } else {
            await db.ratingProduct(req.body);       
        }
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
}

exports.findAllRating = async (req, res) => {
    let result = [];
    
    try {
        const db = ImportProService.getimportProInstance();        
        result = await db.getRating();        
    } catch (error) {      
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
    return res.send(result);
}