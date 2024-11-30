const express = require('express');
const User = require('../models/userModel');
const jwt = require("jsonwebtoken");
const cookies = require("cookie-parser");

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
        if (user.password !== req.body.password) {
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

module.exports = userRouter