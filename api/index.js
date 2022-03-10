const express = require("express")
const dotenv = require('dotenv')
const cors = require("cors")
const Sequelize = require("sequelize")
const user =require("./models/user")
const post = require("./models/post")
const comment = require("./models/comment")
const report = require("./models/report")

const sequelize = require("./util/database")
const authRoute = require("./routes/authRoute")
const userRoute = require("./routes/userRoute")
const postRoute = require("./routes/postRoute")
const commentRoute = require("./routes/commentRoute")
const reportRoute = require("./routes/reportRoute")

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

//one-to-many => hasMany, belongs to (user,post)
user.hasMany(post,{
    foriegnKey: 'userId',
    as: 'post'
})
post.belongsTo(user,{
    foriegnKey: 'userId',
    as: 'user'
})

//one-to-many => hasMany, belongs to (user,comment)
user.hasMany(comment,{
    foriegnKey: 'userId',
    as: 'comment'
})
comment.belongsTo(user,{
    foriegnKey: 'userId',
    as: 'user'
})

//one-to-many => hasMany, belongs to (post,comment)
post.hasMany(comment,{
    foriegnKey: 'postId',
    as: 'comment'
})
comment.belongsTo(post,{
    foriegnKey: 'postId',
    as: 'post'
})


//one-to-many => hasMany, belongs to (post ,report)
post.hasMany(report,{
    foriegnKey: 'postId',
    as: 'report'
})
report.belongsTo(post,{
    foriegnKey: 'postId',
    as: 'post'
})

//one-to-many => hasMany, belongs to (comment ,report)
comment.hasMany(report,{
    foriegnKey: 'commentId',
    as: 'report'
})
report.belongsTo(comment,{
    foriegnKey: 'commentId',
    as: 'comment'
})



//endpoints
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/comments",commentRoute)
app.use("/api/reports", reportRoute)

sequelize.sync().then(result => {
    app.listen(process.env.PORT || 5000 , ()=> {
        console.log("server is running")
    })
}).catch(err=> {
    console.log(err)
})

// {force:true}