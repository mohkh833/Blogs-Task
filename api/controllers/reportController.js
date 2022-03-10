const comment = require("../models/comment")
const post = require("../models/post")
const Report = require("../models/report")
const  Sequelize  = require("sequelize");
const Op = Sequelize.Op

exports.reportPost = async (req, res) => {
    const {report_content,postId} = req.body
    try{
        const report = await Report.create({
            report_content,
            postId
        })
        return res.status(200).json(report)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.reportComment = async (req, res) => {
    const {report_content,commentId} = req.body
    try{
        const report = await Report.create({
            report_content,
            commentId
        })
        return res.status(200).json(report)
    } catch(err){
        res.status(500).json(err)
    }
}

exports.getAllReportedPosts = async (req, res) => {
    try{
        const reportedPosts = await Report.findAll({
            include:[{
                model:post,
                as: "post"
            }],
            where: {postId: {[Op.gt]: 0 }
            } }
        )
        res.status(200).json(reportedPosts)
    } catch(err){
        res.status(500).json(err)
    }
} 

exports.getAllReportedComments = async (req, res) => {
    try{
        const reportedComments = await Report.findAll({
            include:[{
                model:comment,
                as: "comment"
            }],
            where: {commentId:{[Op.gt]: 0}}
            }
        )
        res.status(200).json(reportedComments)
    } catch(err){
        res.status(500).json(err)
    }
} 