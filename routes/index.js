var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index");
});

router.get("/create", function (req, res, next) {
    res.render("create");
});

router.get("/readall", function (req, res, next) {
    res.render("library");
});

module.exports = router;
