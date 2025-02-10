const express = require("express")
const ensureAuthenticated = require("../Middlewares/Auth")
const productRouter = express.Router()

productRouter.get("/get", ensureAuthenticated, (req, res) => {
    console.log("User :", req.user); 
    
    res.status(200).json([
        {
            name : "Mobile",
            price : 2000
        },
        {
            name : "TV",
            price : 4000
        }
    ])
})

module.exports = productRouter