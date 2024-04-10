const mongoose = require("mongoose");

const bookModel = new mongoose.Schema({
    name: String,
    author: String,
    price: Number,
    quantity: Number,
    language: String,
    category: String,
    description: String,
});

const Books = mongoose.model("book", bookModel);

module.exports = Books;
