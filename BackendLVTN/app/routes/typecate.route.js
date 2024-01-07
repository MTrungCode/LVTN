const express = require("express");
const typecates = require("../controllers/typecate.controller");

const router = express.Router();

router.route("/")
    .get(typecates.findAll)
    .post(typecates.create);

router.route("/:id")
    .get(typecates.findOne)
    .put(typecates.update)
    .delete(typecates.delete);

router.route("/getname/:tcateid")
    .get(typecates.findName);

module.exports = router;