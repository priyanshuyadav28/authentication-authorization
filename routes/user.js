const express = require("express");
const router = express.Router();

// import controller
const {signIn, signUp} = require("../controllers/auth");


// map the routes with the controllers
// router.post("/login", login);
router.post("/login", signIn);
router.post("/signup", signUp);

// export
module.exports = router;