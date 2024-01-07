const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
var path = require('path');
var bodyParser = require('body-parser');

//import Router
const productRouter = require("./app/routes/product.route");
const categoryRouter = require("./app/routes/category.route");
const typecateRouter = require("./app/routes/typecate.route");
const trademarkRouter = require("./app/routes/trademark.route");
const authRouter = require("./app/routes/auth.route");
const orderRouter = require("./app/routes/order.route");
const transactionRouter = require("./app/routes/transaction.route");
const commentRouter = require("./app/routes/comment.route");
const staffRouter = require("./app/routes/staff.route");
const couponRouter = require("./app/routes/coupon.route");
const userRouter = require("./app/routes/user.route");
const importRouter = require("./app/routes/importproduct.route");
const vnpayRouter = require("./app/routes/vnpay.route");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'jade');

app.get("/", (req, res) => {
    res.json({ message: "Welcom to my website." });
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../FrontendLVTN/public/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname);
    }
})

const upload = multer({ storage: storage })

app.post('/api/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (file === null) res.send(null);
    else res.send(file.filename);
})

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/typecates", typecateRouter);
app.use("/api/trademarks", trademarkRouter);
app.use("/api/auths", authRouter);
app.use("/api/orders", orderRouter);
app.use("/api/transactions", transactionRouter);
app.use("/api/comments", commentRouter);
app.use("/api/staffs", staffRouter);
app.use("/api/coupons", couponRouter);
app.use("/api/users", userRouter);
app.use("/api/imports", importRouter);
app.use("/api/vnpays", vnpayRouter);

module.exports = app;