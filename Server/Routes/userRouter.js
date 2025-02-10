const express = require("express");
const { loginValidation, signupValidation } = require("../Middlewares/AuthValidation");
const { loginPost, signupPost } = require("../Controllers/authController");
const UserRouter = express.Router();

UserRouter.post("/login", loginValidation , loginPost)

UserRouter.post("/signup", signupValidation, signupPost);

module.exports = UserRouter;
