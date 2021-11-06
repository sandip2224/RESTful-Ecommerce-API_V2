const express = require('express')
const router = express.Router()

const orderModel = require('../models/Order')

router.get('/', async (req, res) => {
    try {
        if (!req.body.hasOwnProperty('userId')) {
            return res.status(200).json({
                message: 'Please enter a valid user id!!'
            })
        }
        const paidOrders = await orderModel.findAll({
            where: {
                userId: req.body.userId,
                paymentStatus: 'CONFIRMED'
            }
        })
        res.status(200).json({
            message: 'List of paid orders!!',
            paidOrders
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

router.post('/', async (req, res) => {
    try {
        if (
            !req.body ||
            !req.body.address ||
            !req.body.pin ||
            !req.body.cardNumber
        ) {
            return res.status(404).json({
                error: 'Required fields are missing!!',
            })
        }
        const order = await orderModel.findOne({
            where: {
                id: req.body.orderId,
                userId: req.body.userId
            }
        })
        if (order === null) {
            return res.status(200).json({
                message: 'Order not found! Please enter the correct details to confirm payment!!'
            })
        }
        if (order.paymentStatus === 'CONFIRMED') {
            return res.status(200).json({
                message: 'Payment has already been confirmed!!'
            })
        }
        order.paymentStatus = 'CONFIRMED'
        await order.save()
        res.status(200).json({
            message: 'Payment confirmed! Your order is on it\'s way',
            orderDetails: order
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