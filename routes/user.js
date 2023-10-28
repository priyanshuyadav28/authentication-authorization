const express = require("express");
const router = express.Router();

// import controller
const {login, signup} = require("../controllers/auth");


// map the routes with the controllers
router.post("/login", login);
router.post("/signup", signup);

// export
module.exports = router;