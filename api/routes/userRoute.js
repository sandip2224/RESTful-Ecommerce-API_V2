const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')

const userModel = require('../models/User')

router.get('/', async (req, res) => {
    try {
        const items = await userModel.findAll()
        res.status(200).json(items)
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

router.get('/:userId', async (req, res) => {
    try {
        const user = await userModel.findAll({
            where: {
                id: req.params.userId
            }
        })
        res.status(200).json(user)
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

router.post('/register', async (req, res) => {
    try {
        const user = await userModel.findAll({
            where: {
                email: req.body.email
            }
        })
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email already in use! Please use a different email address!!'
            })
        }
        const newUser = await userModel.create(req.body)
        res.status(200).json({
            message: 'User registered successfully!!',
            newUser
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await userModel.findAll({
            where: {
                email: req.body.email
            }
        })
        if (user.length === 0) {
            return res.status(200).json({
                message: 'Email does not exist! Please register as new user!!'
            })
        }
        const token = jwt.sign(
            {
                email: user.email,
                level: user.level,
            },
            process.env.JWT_KEY,
            {
                expiresIn: '1h',
            }
        )
        return res.status(200).json({
            message: 'Login successful!!',
            userDetails: user[0],
            token: token,
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

module.exports = router