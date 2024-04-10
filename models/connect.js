const mongoose = require("mongoose");

mongoose
    .connect("mongodb://127.0.0.1:27017/mern9db")
    .then(() => console.log("database connection established"))
    .catch((err) => console.log(err.message));

// database -> collections(schema/model) -> documents
// mern9db -> book -> [{},{},{}]

// install mongoose -> npm i mongoose
// create folder "models" at root directory
// create file "models/connect.js" and write connectivity code
// require the "connect.js" file in "app.js"
// create file "models/bookModels.js" and write schema code and export
