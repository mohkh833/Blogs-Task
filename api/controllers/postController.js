const Post = require("../models/post")
const user = require("../models/user");
const Comment = require("../models/comment")
const  Sequelize  = require("sequelize");
const db = require("../util/database")
const Op = Sequelize.Op

exports.createPost = async(req, res) => {
    const {post_title,post_content,imgUrl,userId} = req.body

    try{
        const post = await Post.create({
            post_title,
            post_content,
            post_img_url:imgUrl,
            userId
        })
        return res.status(201).json({
            post
        })
    } catch (err){
        res.status(500).json(err)
    }
}

exports.getPostsByUserId = async(req,res) => {
    const {userId}= req.params 
    try{
        const posts = await Post.findAll({
            include:[{
                model:user,
                as: 'user'
            }],
            where: {id: userId}
        })
        res.status(200).json(posts)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.getPostById = async(req,res) => {
    const {id}= req.params 
    try{
        const post = await Post.findOne({
            where: {id: id}
        })
        res.status(200).json(post)
    }catch(err){
        res.status(500).json(err)
    }
}

exports.editPost = async(req, res) => {
    const {post_title,post_content,imgUrl} = req.body
    const {id} = req.params
    try{
        let updatedPost = await Post.update({post_title, post_content, imgUrl}, {
            where:{id:id}
        })

        updatedPost = await Post.findOne({
            where:{id:id}
        })
        res.status(200).json(updatedPost)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.deletePost = async(req, res) => {
    const {id} = req.params
    try{
        const deletePost = await Post.destroy({
            where: {id}
        })
        res.status(200).json("deleted successfully")
    } catch(err){
        console.log(err)
        res.status(500).json(err)
    }
}

exports.searchPosts = async(req, res) => {
    const {term} = req.query
    try{
        let result =  await Post.findAll({
            where: {
                post_content: { [Op.like]: '%' + term + '%'},
            }
        })
    
        res.status(200).json(result)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getPostComments = async (req,res) => {
    const {postId} = req.params
    try{
        const post = await Comment.findAll({
            include:[{
                model:Post,
                as: 'post'
            }],
            where: {postId: postId} 
        })
            res.status(200).json(post)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getMostCommentedPost = async (req, res) => {
    try {
        let result = await db.query("SELECT comments.postId, COUNT(comments.postId) AS postCount, posts.post_title,posts.post_content, users.name, users.email from comments JOIN posts on comments.postId = posts.id JOIN users on users.id = posts.userId GROUP BY postId ORDER BY postCount DESC;")
        res.status(200).json(result[0])
    } catch(err){
        res.status(500).json(err)
    }
}

exports.GetAllPosts = async (req, res) => {
    try{
        let result = await db.query("SELECT posts.id, posts.userId, posts.post_img_url, posts.post_title,posts.post_content, users.name, users.email from posts JOIN users on users.id = posts.userId;")
        res.status(200).json(result[0])
    } catch(err){
        res.status(500).json(err)
    }
}
