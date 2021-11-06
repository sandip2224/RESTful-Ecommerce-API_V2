const express = require('express')
const router = express.Router()

const itemModel = require('../models/Item')
const orderModel = require('../models/Order')
const userModel = require('../models/User')

const checkAuth = require('../middleware/checkAuth')

const {
    isAdmin,
    isSeller,
    isCustomer,
    isAdminOrSeller,
} = require('../middleware/checkRoles')


// Payload: userId

router.get('/', checkAuth, isCustomer, async (req, res) => {
    try {
        const orders = await orderModel.findAll({
            include: [{ all: true }],
            where: {
                userId: req.body.userId
            }
        })
        res.status(200).json(orders)
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

// Payload: userId

router.get('/:orderId', checkAuth, isCustomer, async (req, res) => {
    try {
        const order = await orderModel.findAll({
            include: [{ all: true }],
            where: {
                id: req.params.orderId,
                userId: req.body.userId
            }
        })
        res.status(200).json(order)
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

// Payload: itemId, userId, quantity

router.post('/', checkAuth, isCustomer, async (req, res) => {
    if (req.body.hasOwnProperty('paymentStatus')) {
        return res.status(200).json({
            message: 'Payment status cannot be passed as an argument!!'
        })
    }
    try {
        const item = await itemModel.findAll({
            where: {
                id: req.body.itemId
            }
        })
        if (item.length === 0) {
            return res.status(404).json({
                message: 'Item not found!!'
            })
        }
        const newOrder = await orderModel.create(req.body)
        res.status(200).json(newOrder)
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

// Payload: userId

router.delete('/:orderId', checkAuth, isCustomer, async (req, res) => {
    try {
        const response = await orderModel.destroy({
            where: {
                id: req.params.orderId,
                userId: req.body.userId
            }
        })
        if (response === 0) {
            return res.status(404).json({
                message: 'Order details not found!!',
                response
            })
        }
        res.status(200).json({
            message: 'Order deleted sucessfully!!',
            response
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