var express = require("express");
var router = express.Router();

const Books = require("../models/bookModel");

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

router.post("/create", async function (req, res, next) {
    try {
        const newbook = new Books(req.body);
        await newbook.save();
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
    // BOOKS.push(req.body);
    // res.redirect("/readall");
    // Books.create(req.body)
    //     .then(() => {
    //         res.redirect("/readall");
    //     })
    //     .catch((err) => res.send(err));
});

router.get("/readall", async function (req, res, next) {
    try {
        const books = await Books.find();
        res.render("library", { books: books });
    } catch (error) {
        res.send(error);
    }
    // Books.find()
    //     .then((books) => {
    //         res.render("library", { books: books });
    //     })
    //     .catch((err) => res.send(err));
});

router.get("/delete/:id", async function (req, res, next) {
    try {
        await Books.findByIdAndDelete(req.params.id);
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
    // BOOKS.splice(req.params.index, 1);
    // res.redirect("/readall");
});

router.get("/update/:id", async function (req, res, next) {
    try {
        const book = await Books.findById(req.params.id);
        res.render("update", { book: book });
    } catch (error) {
        res.send(error);
    }
    // const i = req.params.index;
    // const b = BOOKS[i];
    // res.render("update", { book: b, index: i });
});

router.post("/update/:id", async function (req, res, next) {
    try {
        await Books.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
    // const i = req.params.index;
    // BOOKS[i] = req.body;
    // res.redirect("/readall");
});

module.exports = router;
