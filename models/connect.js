const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/mern9db")
    .then(() => console.log("database connection established"))
    .catch((err) => console.log(err.message));
