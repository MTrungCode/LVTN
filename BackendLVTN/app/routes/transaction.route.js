const express = require("express");
const transactions = require("../controllers/transaction.controller");

const router = express.Router();

router.route("/")
    .get(transactions.findAll)
    .post(transactions.create);

router.route("/:id")
    .put(transactions.update)
    .delete(transactions.delete);

router.route("/name")
    .get(transactions.findOne);

module.exports = router;