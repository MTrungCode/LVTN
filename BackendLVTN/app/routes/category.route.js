const express = require("express");
const categories = require("../controllers/category.controller");

const router = express.Router();

router.route("/")
    .get(categories.findAll)
    .post(categories.create);    

router.route("/hot/:id")
    .put(categories.updateHot);

router.route("/:typecateid:cateid")
    .get(categories.findCate);

router.route("/typecate/:typecateid")
    .get(categories.findTCate);

router.route("/catename/:id")
    .get(categories.findOne);

router.route("/:id")
    .put(categories.update)
    .delete(categories.delete);

module.exports = router;