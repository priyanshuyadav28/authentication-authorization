
// auth, isStudent, isAdmin
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // extract jwt token

        // const token = req.body.token || req.cookies.token ||req.headers.authorization.split(" ")[1];
        
        const token = req.body.token;

        // check if token exist
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found",
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user = decode;
        } catch(error) {
            res.status(401).json({
                success: false,
                message: "Invalid token",
            })
        }
        next();

    } catch(error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong, while veryfiying the token",
        })
    }
}

exports.isStudent = (req, res, next) => {
    try {
        if(req.user.role !== "Student") {
            return res.status(401).json({
                success: false, 
                message: "This is a protected route for studnets"
            })
        }
        next();
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not matching",
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== "Admin") {
            res.status(401).json({
                success: false,
                message: "This is a protected route for Admin",
            })
        }
        next();
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "User Role is not matching",
        })
    }
}