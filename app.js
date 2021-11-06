const express = require('express')
const colors = require('colors')
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
require('dotenv').config({ path: './config/config.env' })

// Initialize database
const db = require('./config/db')
const itemModel = require('./api/models/Item')
const orderModel = require('./api/models/Order')
const userModel = require('./api/models/User')

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 150 // limit each IP to 100 requests per windowMs
});

// Each item belongs to one or more order, each order belongs to exactly one item
itemModel.hasMany(orderModel)
orderModel.belongsTo(itemModel)

// Each user is associated with one or more orders, each order belongs to one user
userModel.hasMany(orderModel)
orderModel.belongsTo(userModel)

const app = express()

if (process.env.NODE_ENV === 'test') {
    app.use(morgan('dev'))
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(helmet())
app.use(limiter)

app.use('/api/v1/items', require('./api/routes/itemRoute'))
app.use('/api/v1/orders', require('./api/routes/orderRoute'))
app.use('/api/v1/users', require('./api/routes/userRoute'))
app.use('/api/v1/payments', require('./api/routes/paymentRoute'))

app.listen(process.env.PORT || 3000, console.log(`[SUCCESS] Server running on port ${process.env.PORT || 3000}`.green.bold))