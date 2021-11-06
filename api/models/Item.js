const Sequelize = require('sequelize')
const db = require('../../config/db')

const Item = db.define('item', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

Item.sync()
    .then(console.log('> [SUCCESS] Item Table has been created!!'.green.underline))
    .catch(err => console.log('> [FAILED] Post Table creation failed!!'.red.underline))

module.exports = Item