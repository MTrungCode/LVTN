const express = require("express");
const orders = require("../controllers/order.controller");

const router = express.Router();

router.route("/")
    .get(orders.findAll)
    .post(orders.create);

router.route("/:id")
    .get(orders.findOne)
    .delete(orders.delete)
    .put(orders.updateState);

router.route("/historyorder/:userid")
    .get(orders.getHistoryOrder);

router.route("/detailorder")
    .get(orders.getDetail);

module.exports = router;