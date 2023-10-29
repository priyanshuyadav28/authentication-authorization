// import bcrypt library 
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// signUp route handler 
exports.signUp = async (req, res) => {
    try {
        // get the user input data
        const {name, email, password, role} = req.body;

        // check if user already exist 
        const existingUser = await User.findOne({email});

        // if user already exist return error
        if(existingUser) { // since existingUser is an array
            return res.status(400)
            .json({
                success: false,
                message: "User already exist"
            })
        }
        
        // hash or secure the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(error) {
            return res.status(500)
            .json({
                success: false,
                message: "Error in hashing password",
            })
        }

        // create entry for the user in db
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
            role,
        })

        res.status(200)
        .json({
            success: true,
            message: "User created successfully",
            // data: user,
        })

    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success: false, 
            message: "User cannot be registered, please try again later",
        })
    }
}

// login route handler
exports.signIn = async (req, res) => {
    try {
        // get the user input data
        const {email, password} = req.body;
        
        // validation 1: check for email and password
        if(!email || !password) {
            return res.status(400)
            .json({
                success: false,
                message: "Email or password cannot be empty"
            })
        }

        // check for user already exist or not for login
        let user = await User.findOne({email});

        // if user does not exist 
        if(!user) {
            return res.status(401).json({
                status: false,
                message: "User is not registered"
            })
        }

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role,

        }; 

        // check for password match and generate a jwt token
        if(await bcrypt.compare(password, user.password)){
            // password matches then login the user and send jwt token
            let token = jwt.sign(payload, 
                                process.env.JWT_SECRET,
                                {
                                    expiresIn: "2h",
                            });
            // create a token field and insert the token in user, which we found above by findOne method
            const userResponse = user.toObject();
            userResponse.token = token;

            // remove the password from the user object
             userResponse.password = undefined;
            
            const options = {
                expiresIn: new Date(Date.now() + 3 * 24* 60 * 60 * 1000), 
                httpOnly: true,
            }

            // create a cookie with the token
            res.cookie("token", token, options).status(200).json({
                success: true,
                token, 
                user: userResponse,
                message: "User logged in successfully",
            })
        // if block ends here
        }
        else {
            // password do not match
            return res.status(403).json({
                success: false, 
                message: "Invalid Password"
            })
        }

    // try block ends 
    }
    catch(error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Login Failed",
        })
    }
}
