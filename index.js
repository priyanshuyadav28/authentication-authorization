const express = reqire("express");
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 4000;

// adding middleware for parsing request body
app.use(express.json());

// method 1 to connect to the database
// const connect = require("./config/database");
// connect();

// method 2 to connect to the database
require("./config/database").connect();

// import routes and mount them 
// -> importing
const user = require("./route/user");

// -> mounting 
app.use("/api/v1", user);

// activate the server 
app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})


