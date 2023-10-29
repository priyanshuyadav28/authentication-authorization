// import mongoose instance
const mongoose = require("mongoose");

// import dotenv
require("dotenv").config(); 

// function to connect to the database
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,  
        useUnifiedTopology: true,
    })
    .then( () => console.log("Database connected successfully"))
    .catch( (error) => {
        console.log("Error connecting to database...");
        console.error(error);

        // exit the process
        process.exit(1);
    }) 
}

