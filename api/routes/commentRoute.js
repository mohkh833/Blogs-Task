const router = require("express").Router()
const commentController = require("../controllers/commentController")
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyAuthorizationAndAdminComment} = require("../middleware/verifyToken")


// POST /comments/createComment
router.post("/createComment" ,verifyToken, commentController.createComment)

// GET /comments/getByUserId/:userId
router.get("/getByUserId/:userId", verifyToken, commentController.getCommentsByUserId)

//GET /comments/getComentById/:id
router.get("/getComentById/:id",  commentController.getCommentById)

//PUT /comments/updateComment/:id
router.put("/updateComment/:id", verifyAuthorizationAndAdminComment, commentController.editComment)

//DELETE /comments/deleteComment/:id
router.delete("/deleteComment/:id", verifyAuthorizationAndAdminComment, commentController.deleteComment)


module.exports = router