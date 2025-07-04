const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  

  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ 
        success: false,
        error: "User already exists"
       });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = User.create({ name, email, password: hashedPassword });

    res
      .status(201).json(
        {
          success: true,
          message: "User registered successfully",
          data: user,
        }
      );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "User not exists"  });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(400).json({
        success: false,
        error: "invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
       success:true,
       message: "Login success", 
       data:token
       });
    console.log(token);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { login, register };
