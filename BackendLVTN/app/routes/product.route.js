const express = require("express");
const products = require("../controllers/product.controller");

const router = express.Router();

router.route("/")
    .get(products.findAll)
    .post(products.create)
    .put(products.updateQuantity);

router.route("/hot/:id")    
    .put(products.updateHot);

router.route("/hot")
    .get(products.gethotProduct);

router.route("/filterCate/:cateId")
    .get(products.filterProdCate);

router.route("/filterTcate/:tcateId")
    .get(products.filterProdTcate);

router.route("/filtertrademark/:filtertrademark")
    .get(products.findTrademark);

router.route("/:cateName")
    .get(products.getadvanceProduct);

router.route("/:cateId")
    .get(products.findCate);

router.route("/:cateId/:proId")
    .get(products.getSuggestProduct);

router.route("/remaining")
    .get(products.findAllRemaining);

router.route("/:id")
    .get(products.findOne)
    .put(products.update)
    .delete(products.delete);

module.exports = router;