const express = require("express");
const trademarks = require("../controllers/trademark.controller");

const router = express.Router();

router.route("/")
    .get(trademarks.findAll)
    .post(trademarks.create);

router.route("/tradename/:id")
    .get(trademarks.findOne);

router.route("/:id")
    .get(trademarks.findOne)
    .put(trademarks.update)
    .delete(trademarks.delete);

router.route("/cate/:cateid")
    .get(trademarks.findTrademark_Cate);

router.route("/typecate/:tcateid")
    .get(trademarks.findTrademark_Tcate);

module.exports = router;