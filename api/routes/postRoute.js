const router = require("express").Router()
const postController = require("../controllers/postController")
const {verifyToken, verifyTokenAndAuthorization,verifyAuthorizationAndAdminPost} = require("../middleware/verifyToken")

// POST /posts/createPost
router.post("/createPost", verifyToken, postController.createPost)

router.get("/", postController.GetAllPosts)

router.get("/getpostByid/:id", verifyAuthorizationAndAdminPost, postController.getPostById)

//GET  /posts/getUserPosts/:id
router.get("/getUserPosts/:id", verifyToken, postController.getPostsByUserId)

//PUT  /posts/editPost/:id
router.put("/editPost/:id", verifyAuthorizationAndAdminPost, postController.editPost)

//DELETE  /posts/deletePost/:id
router.delete("/deletePost/:id", verifyAuthorizationAndAdminPost, postController.deletePost)

//GET  /posts/getPost
router.get("/getPost", postController.searchPosts)

//GET  /posts/getPostComments/:postId
router.get("/getPostComments/:postId", verifyToken, postController.getPostComments)

//GET /posts/mostCommented
router.get("/mostCommented", verifyToken, postController.getMostCommentedPost)

module.exports = router