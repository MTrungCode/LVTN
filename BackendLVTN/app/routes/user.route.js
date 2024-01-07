const express = require("express");
const user = require("../controllers/user.controller");

const router = express.Router();

router.route("/")
    .get(user.getRank)
    .post(user.sendmail)
    .put(user.addPoint);

router.route("/exchange/:id")
    .put(user.exchangePoint);

router.route("/exchange")
    .get(user.getExchange);

router.route("/getsale/:userid")
    .get(user.getUserSale)
    .delete(user.deleteSale);

module.exports = router;