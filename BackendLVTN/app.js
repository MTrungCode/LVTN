const express = require("express");
const cors = require("cors");

// import upload
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");



//import Router
const productRouter = require("./app/routes/product.route");
const categoryRouter = require("./app/routes/category.route");
// const orderRouter = require("./app/routes/order.route");
const userRouter = require("./app/routes/user.route");
// const shoppingcartRouter = require("./app/routes/shoppingcart.route");

//import Xu ly loi
const ApiError = require("./app/api-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcom to my website." });
});

app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, "./public/images/")
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

var upload = multer({
    storage: storage
});

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
// app.use("/api/orders", orderRouter);
app.use("/api/users", userRouter);
// app.use("/api/shoppingcarts", shoppingcartRouter);

app.use((req, res, next) => {    
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});

module.exports = app;