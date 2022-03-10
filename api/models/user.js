const Sequelize = require("sequelize")

const sequelize = require("../util/database")
const post = require("./post")
const comment = require('./comment')


const user = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    name: {
        type:Sequelize.STRING,
        allowNull:false
    },
    email: {
        type:Sequelize.STRING,
        allowNull:false,
        unique: true,
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    imgUrl:{
        type:Sequelize.STRING,
        allowNull:true
    },
    isAdmin:{
        type:Sequelize.BOOLEAN,
        defaultValue: false
    }
})

// post.belongsTo(user, {constraints: true, onDelete: 'CASCADE', foreignKey: "userId", targetKey: "id" })
// user.hasMany(post)

// user.hasMany(post, {
//     foreignKey:"userId",
//     onDelete:"CASCADE",
//     onUpdate:"CASCADE"
// })

// post.belongsToMany(user, {
//     onDelete:"CASCADE",
//     through: "userId"
// })


// comment.belongsTo(user, {constraints: true, onDelete: 'CASCADE', onUpdate: "CASCADE"})
// user.hasMany(comment)
module.exports = user