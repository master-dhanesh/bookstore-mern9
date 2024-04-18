var express = require("express");
var router = express.Router();

const upload = require("../utils/multer").single("image");

const Books = require("../models/bookModel");

router.get("/", function (req, res, next) {
    res.render("index");
});

router.get("/create", function (req, res, next) {
    res.render("create");
});

router.post("/create", upload, async function (req, res, next) {
    try {
        res.json({ body: req.body, file: req.file });
        // const newbook = new Books(req.body);
        // await newbook.save();
        // res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
});

router.get("/readall", async function (req, res, next) {
    try {
        const books = await Books.find();
        res.render("library", { books: books });
    } catch (error) {
        res.send(error);
    }
});

router.get("/delete/:id", async function (req, res, next) {
    try {
        await Books.findByIdAndDelete(req.params.id);
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
});

router.get("/update/:id", async function (req, res, next) {
    try {
        const book = await Books.findById(req.params.id);
        res.render("update", { book: book });
    } catch (error) {
        res.send(error);
    }
});

router.post("/update/:id", async function (req, res, next) {
    try {
        await Books.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
