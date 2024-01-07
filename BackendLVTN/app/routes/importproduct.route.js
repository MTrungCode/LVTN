const express = require("express");
const imports = require("../controllers/importproduct.controller");

const router = express.Router();

router.route("/")
    .get(imports.getAllImport)
    .post(imports.importProduct);

router.route("/rating")
    .get(imports.findAllRating)
    .post(imports.addRating);

module.exports = router;