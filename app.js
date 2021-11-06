const express = require('express')
const colors = require('colors')
require('dotenv').config({ path: './config/config.env' })

// Initialize database
const db = require('./config/db')
const itemModel = require('./api/models/Item')
const orderModel = require('./api/models/Order')
const userModel = require('./api/models/User')

// Each item belongs to one or more order, each order belongs to exactly one item
itemModel.hasMany(orderModel)
orderModel.belongsTo(itemModel)

// Each user is associated with one or more orders, each order belongs to one user
userModel.hasMany(orderModel)
orderModel.belongsTo(userModel)

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1/items', require('./api/routes/itemRoute'))
app.use('/api/v1/orders', require('./api/routes/orderRoute'))
app.use('/api/v1/users', require('./api/routes/userRoute'))

app.listen(process.env.PORT || 3000, console.log(`[SUCCESS] Server running on port ${process.env.PORT || 3000}`.green.bold))