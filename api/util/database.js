const Sequelize = require("sequelize")

const sequelize = new Sequelize('blog', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize