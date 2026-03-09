const express = require('express');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookies = require("cookie-parser");
const auth = require('../middlewares/authMiddleware');
const sendEmail = require('../utils/emailHelper');

const userRouter  = express.Router()

// Register a user

userRouter.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email })
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }
        const newUser = new User(req.body)
        newUser.password = await bcrypt.hash(req.body.password, 10)
        await newUser.save()
        res.status(201).json({
            success: true,
            message: 'User registered successfully. Please login to continue' 
        })
    } catch (error) {
        res.status(500).json({ message: `Error registering user: ${error.message}` })
    }
})

// Login a user

userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User does not exist. Please register first'
            })
        }
        if (!(await bcrypt.compare(req.body.password, user.password))) {
            return res.status(400).json({
                success: false,
                message: 'Password is incorrect. Please try again with correct credentials'
            })
        }
        console.log("secret", process.env.JWT_SECRET)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
        console.log("token", token)
        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', expires: new Date(Date.now() + 86400000) })
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: token
        })
    } catch (error) {
        res.status(500).json({ message: `Error logging in user: ${error.message}` })
    }
})

userRouter.get("/get-current-user", auth, async (req, res) => {
    const user = await User.findById(req.body.userId).select("-password")
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
    })
})

// Forget password - send OTP
userRouter.patch("/forgetpassword", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found with this email",
            });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
        await user.save();

        await sendEmail(user.email, "Password Reset OTP - BookMyShow", "otp.html", {
            name: user.name,
            otp: otp,
        });

        res.status(200).json({
            success: true,
            message: "OTP sent to your email",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

// Reset password with OTP
userRouter.patch("/resetpassword/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.otp !== req.body.otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        if (user.otpExpiry < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired",
            });
        }

        user.password = await bcrypt.hash(req.body.password, 10);
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = userRouter