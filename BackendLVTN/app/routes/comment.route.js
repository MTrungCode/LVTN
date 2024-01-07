const express = require("express");
const comments = require("../controllers/comment.controller");

const router = express.Router();

router.route("/")
    .post(comments.create);

router.route("/:proid")
    .get(comments.findAll);

router.route("/:id")
    .get(comments.findOne)
    .delete(comments.delete)
    .put(comments.update);

module.exports = router;