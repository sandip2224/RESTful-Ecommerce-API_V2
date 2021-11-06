const Sequelize = require('sequelize')
const db = require('../../config/db')

const Payment = db.define('payment', {
    orderId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pin: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cardNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isCreditCard: true
        }
    }
})

Payment.sync()
    .then(console.log('> [SUCCESS] Payment Table has been created!!'.green.underline))
    .catch(err => {
        console.log('> [FAILED] Payment Table creation failed!!'.red.underline)
        console.log(err)
    })

module.exports = Payment