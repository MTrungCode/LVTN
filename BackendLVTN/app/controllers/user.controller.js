const UserService = require("../services/user.service");
const nodemailer = require("nodemailer");

exports.addPoint = async (req, res) => {
    try {
        const db = UserService.getUserInstance();
        const result = await db.addPointEG(
            req.body.userpoint,
            req.body.userid
        );
        if (!result) {
            return res.status(404).send("Không tìm thấy người dùng!");
        }
        const checkUser = await db.issetUser(req.body.userid);
        if (checkUser) {
            let currentPoint = JSON.parse(JSON.stringify(checkUser))[0].current_point;                      
            await db.updatePointRanking(
                currentPoint+req.body.point,
                req.body.userid
            );
        } else {
            await db.createMonthlyRank([
                req.body.userid,
                req.body.username,
                req.body.point
            ]);
        }
        return res.send("Đã cộng điểm thành công");
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
}

exports.exchangePoint = async (req, res) => {
    try {
        const db = UserService.getUserInstance();      
        const result = await db.subtractPointEG(
            req.body.remain,
            req.params.id
        );
        if (!result) {
            return res.status(404).send("Không tìm thấy người dùng!");
        }
        const checkTurn = await db.issetCoupon(
            req.params.id,
            req.body.couponId
        );        
        if (checkTurn.length !== 0) {
            await db.updateTurnExchange(
                req.body.couponId,
                req.params.id
            )
        } else {
            await db.createUserCoupon([
                req.params.id,
                req.body.couponId,
                1
            ]);
        }
        return res.send("Đã đổi điểm thành công");
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
}

exports.getExchange = async (req, res) => {
    let result = [];
    try {
        const db = UserService.getUserInstance();
        result = await db.getTurnExchange();
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
    return res.send(result);
}

exports.getRank = async (req, res) => {
    let ranks = [];

    try {
        const db = UserService.getUserInstance();
        ranks = await db.getRanking();        
    } catch (error) {        
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
    return res.send(ranks);
}

exports.getUserSale = async (req, res) => {
    let result = [];
    
    try {
        const db = UserService.getUserInstance();        
        result = await db.getUserCouponId(req.params.userid);         
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
    return res.send(result);
}

exports.deleteSale = async (req, res) => {
    try {
        const db = UserService.getUserInstance();        
        result = await db.deleteSale(req.params.userid, req.query.data);
        if (!result) {
            return res.status(404).send("Không tìm thấy dữ liệu");
        }
        return res.send("Xóa thành công");    
    } catch (error) {
        return res.status(500).send("Đã có lỗi xảy ra, vui lòng thử lại sau!");
    }
}

exports.sendmail = async (req, res) => {
    var point = req.body.point;
    var userEmail = req.body.emailUser;
    var total = req.body.total;
    var addpoint = req.body.pointadd;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'zakugan369@gmail.com',
          pass: 'ubqv fpmc xwjt krqw'
        }
    });

    var htmlcontent = '<h3>Chúc mừng bạn đã đặt hàng thành công</h3><br/><br/><div>Đơn hàng của bạn có giá trị là ' + total + ' đồng.</div><br/><div>Bạn đã được cộng thêm ' + addpoint + ' điểm EG.</div><br/><div>Tổng điểm hiện tại của bạn là ' + point + ' điểm.</div><br/><span>(Hạn sử dụng đến hết 0 giờ ngày 31 tháng 12 năm 2023).</span>'
      
    var mailOptions = {
        from: 'ExportGoods <zakugan369@gmail.com>',
        to: userEmail,
        subject: 'Thông báo từ cửa hàng ExportGoods',
        html: htmlcontent
    };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}