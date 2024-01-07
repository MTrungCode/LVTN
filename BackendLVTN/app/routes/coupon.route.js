const express = require("express");
const coupons = require("../controllers/coupon.controller");

const router = express.Router();

router.route("/")
    .get(coupons.findAll)
    .post(coupons.create);

router.route("/:id")
    .get(coupons.findOne)
    .put(coupons.update)
    .delete(coupons.delete);

module.exports = router;