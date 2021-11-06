const Sequelize = require('sequelize')
const db = require('../../config/db')

const Order = db.define('order', {
    itemId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    paymentStatus: {
        type: Sequelize.STRING,
        defaultValue: 'PENDING'
    }
},
    {
        validate: {
            isPendingOrConfirmed() {
                if (!(this.paymentStatus == 'PENDING' || this.paymentStatus == 'CONFIRMED')) {
                    throw new Error('Invalid payment status! Valid values are PENDING and CONFIRMED!!');
                }
            }
        }
    })

Order.sync()
    .then(console.log('> [SUCCESS] Order Table has been created!!'.green.underline))
    .catch(err => {
        console.log('> [FAILED] Order Table creation failed!!'.red.underline)
        console.log(err)
    })

module.exports = Order