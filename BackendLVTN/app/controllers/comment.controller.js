const CommentService = require("../services/comment.service");

exports.create = async (req, res) => {

    try {
        const db = CommentService.getCommentInstance();
        const commentId = await db.insertNewComment(req.body);
        const result = await db.findByIdComment(commentId);
        if (result)
            return res.send(result);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lỗi xảy ra khi đăng nhận xét")
    }
}

exports.findAll = async (req, res) => {
    let results = [];
    try {
        const db = CommentService.getCommentInstance();
        results = await db.getAllComment(req.params.proid);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lỗi truy xuất nhận xét");
    }
    return res.send(results);
}

exports.update = async (req, res) => {
    if (Object.keys(req.body).length === 0) {
        return res.status(400).send("Dữ liệu cập nhật không được bỏ trống");
    }
    try {
        const db = CommentService.getCommentInstance();        
        const affectedRows = await db.updateComment(
            req.body[0], req.params.id, 
        );
        
        if (affectedRows){
            const result = await db.findByIdComment(req.params.id);
            return res.send(result);
        }       
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Lỗi sửa comment có id=${req.params.id}`)
    }
};

exports.findOne = async (req, res) => {
    
    try {
        const db = CommentService.getCommentInstance();
        const result = await db.findByIdComment(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy nhận xét");
        }
        return res.send(result);
    } catch (error) {
        console.log(error)
        return res.status(500).send("Lỗi truy xuất nhận xét");
    }
}

exports.delete = async (req, res) => {
    
    try {
        const db = CommentService.getCommentInstance();
        const result = await db.deleteComment(req.params.id);
        if (!result) {
            return res.status(404).send("Không tìm thấy đơn hàng");
        }
        return res.send("Xóa đơn hàng thành công");
    } catch (error) {
        console.log(error)
        return res.status(500).send(`Không thể xóa đơn hàng có id=${req.params.id}`);
    }
}