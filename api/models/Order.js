const Sequelize = require('sequelize')
const db = require('../../config/db')

const Order = db.define('order', {
    itemId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
})

Order.sync()
    .then(console.log('[SUCCESS] Order Table has been created!!'.green.underline))
    .catch(err => {
        console.log('[FAILED] Order Table creation failed!!'.red.underline)
        console.log(err)
    })

module.exports = Order