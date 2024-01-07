const ProductService = require("../services/product.service");
const fs = require('fs')

exports.create = async (req, res) => {    
    if (!req.body[0]) {
        return res.status(400).send("Name can not be empty");
    }
    if (!req.body[2]) {
        return res.status(400).send("Price can not be empty");
    }
    if (!req.body[3]) {
        return res.status(400).send("Thumbar can not be empty");
    }
    if (!req.body[4]) {
        return res.status(400).send("Thumbar can not be empty");
    }

    try {
        const db = ProductService.getProductInstance();
        await db.insertNewProduct(req.body);

        return res.send("Thêm mới thành công");
    } catch (error) {
        return res.status(500).send("An error occurred while creating the new product");
    }
};

exports.findAll = async (req, res) => {
    let results = [];
    
    try {
        const db = ProductService.getProductInstance();        
        const name = req.query.keywork;
        
        if (name) {
            results = await db.findByNameProduct("%" + name + "%");
        } 
        else {
            results = await db.getAllProduct();
        }
    } catch (error) {      
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
    return res.send(results);
};

exports.filterProdCate = async (req, res) => {
    let results = [];
    try {
        const db = ProductService.getProductInstance();
        results = await db.filterProductByCate(req.params.cateId);
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
    return res.send(results);
}

exports.filterProdTcate = async (req, res) => {
    let results = [];
    try {
        const db = ProductService.getProductInstance();
        results = await db.filterProductByTCate(req.params.tcateId);
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }
    return res.send(results);
}

exports.gethotProduct = async (req, res) => {
    let result = [];
    try {
        const db = ProductService.getProductInstance();        
        result = await db.hotProduct();
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }    
    return res.send(result);
}

exports.getadvanceProduct = async (req, res) => {
    let result = [];
    try {
        const db = ProductService.getProductInstance();      
        result = await db.advanceProduct(req.params.cateName);
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }    
    return res.send(result);
}

exports.findCate = async (req, res) => {
    let result = [];
    try {
        const db = ProductService.getProductInstance(); 
        result = await db.getProductByCate(req.params.cateId);
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }    
    return res.send(result);
}

exports.findTrademark = async (req, res) => {
    let result = [];
    try {
        const db = ProductService.getProductInstance();
        result = await db.filterProductTrademark(req.params.filtertrademark)        
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau");
    }

    return res.send(result);
}

exports.findOne = async (req, res) => {
    try {
        const db = ProductService.getProductInstance();    
        const result = await db.findByIdProduct(req.params.id);
        if (result === null) {
            return res.status(404).send("Product not found");
        }
        return res.send(result);
    } catch (error) {
        return res.status(500).send('Đã có lỗi xảy ra, vui lòng thử lại sau'); 
    }
};

exports.update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Data to update can not be empty");
    }
    try {
        const db = ProductService.getProductInstance();
        const check = await db.findByIdProduct(req.params.id);
        if (check === null) {
            return res.status(400).send("Product not found");
        }
        await db.updateProduct(
            req.body[0], req.body[1], req.body[2], req.body[3], req.body[4], req.body[5], req.body[6], req.body[7], req.body[8], req.params.id
        );        
        
        return res.send("Product was updated successfully");
    } catch (error) {
        return res.status(500).send('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
};

exports.updateQuantity = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Data to update can not be empty");
    }
    try {
        const db = ProductService.getProductInstance();
        const check = await db.findByIdProduct(req.body[1]);
        if (check === null) {
            return res.status(400).send("Product not found");
        }
        await db.updateQuantityProduct(
            req.body[0], req.body[1]
        );                    
        return res.send("Quantity product was updated successfully");
    } catch (error) {
        return res.status(500).send('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
};

exports.updateHot = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Data to update can not be empty");
    }
    try {
        const db = ProductService.getProductInstance();
        const check = await db.findByIdProduct(req.params.id);
        if (check === null) {
            return res.status(400).send("Product not found");
        }
        await db.updateProductHot(
            req.params.id, req.body[0]
        );                              
        return res.send("Product hot was updated successfully");
    } catch (error) {
        return res.status(500).send('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
};

exports.delete = async (req, res) => {
    try {
        const db = ProductService.getProductInstance();
        const check = await db.findByIdProduct(req.params.id);
        if (check === null) {
            return res.status(400).send("Product not found");
        }  
        const result = await db.deleteProduct(req.params.id);        
        if (result) {                     
            fs.unlinkSync("D:/Trung/lvtn/FrontendLVTN/public/uploads/" + check[0].pro_image);
        }
        return res.send("Product was deleted successfully");
    } catch (error) {
        return res.status(500).send('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
};

exports.getSuggestProduct = async (req, res) => {
    try {
        const db = ProductService.getProductInstance();
        const result = await db.getSuggestProduct(req.params.cateId, req.params.proId);
        
        return res.send(result);
    } catch (error) {
        return res.status(500).send('Đã có lỗi xảy ra, vui lòng thử lại sau');
    }
}

exports.findAllRemaining = async (req, res) => {
    let result = [];
    try {
        const db = ProductService.getProductInstance();
        result = await db.remainingProducts();
    } catch (error) {       
        return res.status(500).send("Lỗi truy xuất sản phẩm tồn kho");
    }
    return res.send(result);
};