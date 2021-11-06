const Sequelize = require('sequelize')
const db = require('../../config/db')

const User = db.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    level: {
        type: Sequelize.STRING,
        allowNull: false
    },
},
    {
        validate: {
            isPartOf() {
                if (!(this.level == 'customer' || this.level == 'seller' || this.level == 'admin')) {
                    throw new Error('Invalid level! Allowed levels are customer, seller and admin!!');
                }
            }
        }
    }
)

User.sync()
    .then(console.log('[SUCCESS] User Table has been created!!'.green.underline))
    .catch(err => console.log('[FAILED] User Table creation failed!!'.red.underline))

module.exports = User