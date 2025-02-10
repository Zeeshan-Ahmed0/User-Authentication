const userModel = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupPost = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists", success: false });
    }
    const UserModel = new userModel({ name, email, password });
    UserModel.password = await bcrypt.hash(password, 10);
    await UserModel.save();
    res.status(201).json({ message: "Signup Successful!", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

const loginPost = async (req, res) => {
  try {
    const {  email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(403).json({
        message: "Invalid email or password",
        success: false,
      });
    }
    const isPassEqual = await bcrypt.compare(password, user.password);
      if (!isPassEqual) {
        return res.status(403).json({
          message: "Invalid password",
          success: false,
        });
    }
    const jwtToken = jwt.sign(
      { email: user.email, _id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login Successful!", success: true, jwtToken, email, name : user.name });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", success: false, error });
  }
};

module.exports = { signupPost, loginPost };
