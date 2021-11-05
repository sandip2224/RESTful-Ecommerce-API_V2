const express = require('express')
const router = express.Router()

const itemModel = require('../models/Item')
const orderModel = require('../models/Order')

router.get('/', async (req, res) => {
    try {
        const orders = await orderModel.findAll({
            include: itemModel
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

router.get('/:orderId', async (req, res) => {
    try {
        const order = await orderModel.findAll({
            include: itemModel,
            where: {
                id: req.params.orderId
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

router.post('/', async (req, res) => {
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

router.patch('/:orderId', async (req, res) => {
    try {
        if (req.body.hasOwnProperty('itemId')) {
            const item = await itemModel.findAll({
                where: {
                    id: req.body.itemId
                }
            })
            if (item.length === 0) {
                return res.status(404).json({
                    message: 'Item not found. Please edit with a valid item id!!'
                })
            }
        }
        // Item exists
        const response = await orderModel.update(
            req.body,
            {
                where: { id: req.params.orderId }
            })
        res.json({
            message: 'Order updated successfully!!',
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

router.delete('/:orderId', async (req, res) => {
    try {
        const response = await orderModel.destroy({
            where: {
                id: req.params.orderId
            }
        })
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