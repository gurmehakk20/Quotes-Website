const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ msg: "User registered successfully" });

    }
    catch(err) {
        res.status(500).json({ msg: "Error registering user", error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check user
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).json({ msg: "User not found" });
        
        // Compare Password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Create JWT
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email, role: existingUser.role || "User" },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.status(200).json({
      user: {
        _id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        role: existingUser.role || "User"
      },
      token,
    })

    }
    catch(err) {
        console.error(err)
        res.status(500).json({ msg: "Error logging in", error: err.message });
    }
};

const me = (req, res) => {
  res.json({ user: req.user }) // req.user comes from verifyToken middleware
}

module.exports = { register, login, me };