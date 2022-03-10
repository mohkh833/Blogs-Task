const jwt = require("jsonwebtoken")
const Post = require("../models/post")
const Comment = require("../models/comment")

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if(authHeader){
        const token = authHeader.split(" ")[1]
        jwt.verify(token , process.env.JWT_SEC, (err, user) => {
            if(err) res.status(403).json(err)
            req.user = user
            next()
        })
    } else return res.status(401).json("You are not authenticated")
}

const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.id == req.params.id) {
            next()
        } else {
            res.status(403).json("You are not allowed to do this")
        }
    })
}

const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, ()=> {
        if(req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("You are not allowed to do this")
        }
    })
}

const verifyAuthorizationAndAdminPost = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        } 
        else{
            getPostUserId(req.user.id).then((result) => {
                let id = result
                if(req.user.id === id)
                next()
                else
                res.status(403).json("You are not allowed to do this")
            })
        }
    })
}

const verifyAuthorizationAndAdminComment = (req, res, next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next()
        } 
        else{
            getCommentUserID(req.user.id).then((result) => {
                let id = result
                if(req.user.id === id)
                next()
                else
                res.status(403).json("You are not allowed to do this")
            })
        }
    })
}

const getPostUserId =  async (id) => {
    try{
        let post = await Post.findOne({
            where:{userId:id}
        })
        return post.dataValues.userId
    } catch(err) {
        console.log(err)
    }
}

const getCommentUserID =  async (id) => {
    try{
        let comment = await Comment.findOne({
            where:{userId:id}
        })
        return comment.dataValues.userId
    } catch(err) {
        console.log(err)
    }
}
module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
    verifyAuthorizationAndAdminPost,
    verifyAuthorizationAndAdminComment
};