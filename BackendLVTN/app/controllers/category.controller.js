const database = require("../../database");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }

    try {
        const db = database.getDatabaseInstance();
        const result = await db.insertNewProduct(req.body.name, req.body.description, req.body.price, req.body.thumbar);
        
        return res.send(result + ""); //post
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the new product")
        )
    }
};

exports.findAll = async (req, res, next) => {
    let results = [];
    
    try {
        const db = database.getDatabaseInstance();
        const { name } = req.query;
        if (name) {
            results = await db.findByNameProduct(name);
        } else {
            results = await db.getAllProduct();
        }
    } catch (error) {        
        return next(
            new ApiError(500, "An error occurred while retieving products")
        );
    }
    
    return res.send(results);
};

exports.findOne = async (req, res, next) => {
    try {
        const db = database.getDatabaseInstance();    
        const result = await db.findByIdProduct(req.params.id);
        if (!result) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send(result);
    } catch (error) {
        return next(
            new ApiError(500, "Error retrieving product with id=${req.params.id}")
        ); 
    }

};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
    try {
        const db = database.getDatabaseInstance();        
        const result = await db.updateProduct(
            req.params.id, req.body.name, req.body.description, req.body.price, req.body.thumbar
        );
        
        if (!result) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({ message: "Product was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, "Error updating product with id=${id}")
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const db = database.getDatabaseInstance();    
        const result = await db.deleteProduct(req.params.id);
        if (!result) {
            return next(new ApiError(404, "Product not found"));
        }
        return res.send({ message: "Product was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, "Could not delete product with id=${req.params.id}")
        );
    }
};

exports.findAllFavorite = (req, res, next) => {
    res.send({ message: "findAllFavorite" });
};