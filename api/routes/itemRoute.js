const express = require('express')
const router = express.Router()

const itemModel = require('../models/Item')

router.get('/', async (req, res) => {
    try {
        const items = await itemModel.findAll()
        res.status(200).json(items)
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

router.get('/:itemId', async (req, res) => {
    try {
        const item = await itemModel.findAll({
            where: {
                id: req.params.itemId
            }
        })
        res.status(200).json(item)
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
        const newItem = await itemModel.create(req.body)
        res.status(200).json(newItem)
    }
    catch (err) {
        res.status(500).json({
            message: 'Unexpected error occurred!!',
            error: err
        })
    }
})

router.patch('/:itemId', async (req, res) => {
    try {
        const response = await itemModel.update(
            req.body,
            {
                where: { id: req.params.itemId }
            })
        res.json({
            message: 'Item updated successfully!!',
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

router.delete('/:itemId', async (req, res) => {
    try {
        const response = await itemModel.destroy({
            where: {
                id: req.params.itemId
            }
        })
        res.status(200).json({
            message: 'Item deleted sucessfully!!',
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

router.delete('/', async (req, res) => {
    try {
        const response = await itemModel.destroy({
            where: {}
        })
        res.status(200).json({
            message: 'All items deleted sucessfully!!',
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