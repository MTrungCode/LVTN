const express = require("express");
const users = require("../controllers/user.controller");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route("/register")
    .post(users.register);

router.route("/register-admin")
    .post(users.registerAdmin);

router.route("/login")
    .post(users.login);

module.exports = router;