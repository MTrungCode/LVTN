const TransactionService = require("../services/transaction.service");

exports.create = async (req, res) => {

    try {
        const db = TransactionService.getTransactionInstance();
        await db.insertNewTransaction(req.body);

        return res.send("Tạo mới giao dịch thành công");
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lỗi xảy ra khi tạo mới giao dịch")
    }
}

exports.findAll = async (req, res) => {
    let results = [];
    try {
        const db = TransactionService.getTransactionInstance();
        results = await db.getAllTransaction();
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lỗi truy xuất giao dịch");
    }

    return res.send(results);
}

exports.findOne = async (req, res) => {
    
    try {
        const db = TransactionService.getTransactionInstance();
        const result = await db.findByNameTransaction(req.query.name);
        if (!result) {
            return res.status(404).send("Không tìm thấy giao dịch");
        }
        return res.send(result);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lỗi truy xuất giao dịch");
    }
}

exports.update = async (req, res) => {
    try {
        const db = TransactionService.getTransactionInstance();
        const affectedRows = await db.updateTransactionState(req.params.id, req.body[0]);
        
        if (affectedRows) {
            const result = await db.findByIdTransaction(req.params.id)
            return res.send(result);
        }          
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Lỗi cập nhật giao dịch có id=${req.params.id}`)
    }
}

exports.delete = async (req, res) => {
    
    try {
        const db = TransactionService.getTransactionInstance();
        const result = await db.deleteTransaction(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy giao dịch");
        }
        return res.send("Xóa giao dịch thành công");
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Không thể xóa giao dịch có id=${req.params.id}`);
    }
}