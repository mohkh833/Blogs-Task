const Sequelize = require("sequelize")

const sequelize = require("../util/database")
const comment = require('./comment')
const post = sequelize.define('post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true
    },
    post_title: {
        type:Sequelize.STRING,
        allowNull:false
    },
    post_content:{
        type:Sequelize.STRING,
        allowNull:false
    },
    post_img_url:{
        type:Sequelize.STRING,
        allowNull:true
    },
})

// comment.belongsTo(post, {constraints: true, onDelete: 'CASCADE', onUpdate: "CASCADE"})
// post.hasMany(comment)
module.exports = post