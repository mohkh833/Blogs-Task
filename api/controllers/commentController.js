const Comment = require("../models/comment")
const User = require("../models/user")
const Post = require("../models/post")


exports.createComment  = async(req,res) => {
    const {comment_content, postId, userId} = req.body
    try{
        const comment = await Comment.create({
            comment_content,
            postId,
            userId
        })
        return res.status(201).json(comment)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getCommentsByUserId = async (req,res) => {
    const {userId} = req.params
    try{
        const comments = await Comment.findAll({
            include:[{
                model:User,
                as: 'user'
            }],
            where: {userId: userId} 
        })
            res.status(200).json(comments)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getCommentById = async(req, res) => {
    const {id} = req.params
    try{
        const comment = await Comment.findAll({
            include:[{
                model:Post,
                as: 'post'
            }],
            include:[{
                model:User,
                as: 'user'
            }],
            where: {postId: id}}
            )
        // let comment = await db.query("SELECT posts.id, posts.userId, posts.post_title,posts.post_content, users.name, users.email from posts JOIN users on users.id = posts.userId;")
        res.status(200).json(comment)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.editComment = async(req, res)=> {
    const {id} = req.params
    const {comment_content} = req.body
    try{
        let updatedCommment = await Comment.update({comment_content}, {
            where:{id:id}
        })
        console.log(updatedCommment)
        updatedCommment = await Comment.findOne({
            where:{id:id}
        })
        res.status(200).json(updatedCommment)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.deleteComment = async(req, res) => {
    const {id} = req.params
    try{
        await Comment.destroy({
            where: {id}
        })
        res.status(200).json("deleted successfully")
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.searchComments = async(req, res) => {
    const {term} = req.query
    try{
        let result =  await Comment.findAll({
            where: {
                comment_content: { [Op.like]: '%' + term + '%'},
            }
        })
        res.status(200).json(result)
    } catch(err){
        res.status(500).json(err)
    }
}



