const express = require("express");
const auth = require("../controllers/auth.controller");

const router = express.Router();

router.route("/register")
    .post(auth.register);

router.route("/login")
    .post(auth.login);

router.route("/logout")
    .post(auth.logout);

router.route("/")
    .get(auth.getAll)
    .put(auth.resetPoint);

router.route("/:id")
    .get(auth.findOne)
    .put(auth.updateInfo);

module.exports = router;