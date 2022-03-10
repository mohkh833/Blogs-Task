const router = require("express").Router()
const reportController = require("../controllers/reportController")
const {verifyToken,  verifyTokenAndAdmin} = require("../middleware/verifyToken")

//POST /reports/reportPost
router.post("/reportPost", verifyToken, reportController.reportPost)

//POST /reports/reportComment
router.post("/reportComment", verifyToken, reportController.reportComment)

//GET /reports/getAllPosts
router.get("/getAllPosts", verifyTokenAndAdmin,reportController.getAllReportedPosts)

//GET /reports/getAllComments
router.get("/getAllComments", verifyTokenAndAdmin,reportController.getAllReportedComments)

module.exports = router