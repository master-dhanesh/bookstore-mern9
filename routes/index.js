var express = require("express");
var router = express.Router();

const BOOKS = [
    {
        name: "Book 1",
        author: "Author 1",
        price: 1234,
        quantity: 10,
        language: "Hindi",
        category: "Fiction",
        description:
            "lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet",
    },
];

router.get("/", function (req, res, next) {
    res.render("index");
});

router.get("/create", function (req, res, next) {
    res.render("create");
});

router.post("/create", function (req, res, next) {
    BOOKS.push(req.body);
    res.redirect("/readall");
});

router.get("/readall", function (req, res, next) {
    res.render("library", { books: BOOKS });
});

router.get("/delete/:index", function (req, res, next) {
    BOOKS.splice(req.params.index, 1);
    res.redirect("/readall");
});

router.get("/update/:index", function (req, res, next) {
    const i = req.params.index;
    const b = BOOKS[i];
    res.render("update", { book: b, index: i });
});

module.exports = router;
