const express = require("express");
const staff = require("../controllers/staff.controller");
const bodyParser = require("body-parser");

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.route("/addStaff")
    .post(staff.addStaff);

router.route("/update-info")
    .post(staff.updateInfo);

router.route("/change-password")
    .post(staff.changePassword);

router.route("/login")
    .post(staff.login);

router.route("/logout")
    .post(staff.logout);

router.route("/")
    .get(staff.getAll);

router.route("/:id")
    .put(staff.update);

router.route("/authority/:id")
    .put(staff.updateAuthority);

module.exports = router;