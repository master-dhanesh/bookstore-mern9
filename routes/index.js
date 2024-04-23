var express = require("express");
var router = express.Router();

const fs = require("fs");
const path = require("path");

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
        const newbook = new Books({ ...req.body, image: req.file.filename });
        await newbook.save();
        res.redirect("/readall");
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
        const book = await Books.findByIdAndDelete(req.params.id);

        fs.unlinkSync(
            path.join(__dirname, "..", "public", "images", book.image)
        );

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

router.post("/update/:id", upload, async function (req, res, next) {
    try {
        const updateddata = { ...req.body };
        if (req.file) {
            updateddata.image = req.file.filename;
            fs.unlinkSync(
                path.join(
                    __dirname,
                    "..",
                    "public",
                    "images",
                    req.body.oldimage
                )
            );
        }

        await Books.findByIdAndUpdate(req.params.id, updateddata);
        res.redirect("/readall");
    } catch (error) {
        res.send(error);
    }
});

module.exports = router;
