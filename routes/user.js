const express = require("express");
const router = express.Router();

// import controller
const {signIn, signUp} = require("../controllers/auth");

// import middlewares
const {auth, isStudent, isAdmin} = require("../middlewares/auth");



// map the routes with the controllers
// router.post("/login", login);
router.post("/login", signIn);
router.post("/signup", signUp);


// testing route for single middleware
router.get("/test", auth, (req, res) => {
    res.json({
        success: true, 
        message: "Welcome to protected route for TESTS...",
    })

})

// protected routes
router.get("/student", auth, isStudent, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protectd Route for Students...",
    });
})

router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the Protected Route for Admin..."
    });
})







// export
module.exports = router;