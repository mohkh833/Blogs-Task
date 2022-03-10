const Sequelize = require("sequelize")

const sequelize = require("../util/database")

const report = sequelize.define('report', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    report_content:{
        type:Sequelize.STRING,
        allowNull:false
    },

})

module.exports = report