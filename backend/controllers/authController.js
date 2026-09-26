const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Register
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const accessToken = jwt.sign(
            { userId: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            message: "Login successful",
            accessToken
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


// Refresh Token
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refreshToken;

        if (!token) {
            return res.status(401).json({
                message: "Refresh token required"
            });
        }

        const user = await User.findOne({
            refreshToken: token
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid refresh token"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.REFRESH_TOKEN_SECRET
        );

        const newAccessToken = jwt.sign(
            { userId: decoded.userId },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        res.json({
            accessToken: newAccessToken
        });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired refresh token"
        });
    }
};


// Logout
const logout = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.user.userId, {
            refreshToken: null
        });

        res.clearCookie("refreshToken");

        res.json({
            message: "Logout successful"
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get current user
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password -refreshToken");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json({
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    register,
    login,
    refreshToken,
    logout,
    getMe
};