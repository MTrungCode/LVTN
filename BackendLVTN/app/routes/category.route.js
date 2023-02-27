const express = require("express");
const categories = require("../controllers/category.controller");

const router = express.Router();

router.route("/")
    .get(categories.findAll)
    .post(categories.create);

router.route("/favorite")
    .get(categories.findAllFavorite);

router.route("/:id")
    .get(categories.findOne)
    .put(categories.update)
    .delete(categories.delete);

module.exports = router;