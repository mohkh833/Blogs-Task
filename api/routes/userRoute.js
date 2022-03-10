const router = require("express").Router()
const userController = require("../controllers/userController")
const { verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleware/verifyToken")

//PUT /users/updateUser/:id
router.put("/updateUser/:id",verifyTokenAndAuthorization, userController.updateUser)

//GET /users/getUser/:id
router.get("/getUser/:id",verifyTokenAndAuthorization, userController.getUserById)

//GET /users/
router.get("/", verifyTokenAndAdmin,userController.getAllUsers)

//DELETE /users/deleteUser/:id
router.delete("/deleteUser/:id", verifyTokenAndAdmin,userController.deleteUserByid)

module.exports = router