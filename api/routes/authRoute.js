const router = require("express").Router()
const authController = require("../controllers/authController")

// POST /auth/regiter
router.post("/register", authController.register)

// POST /auth/login
router.post("/login", authController.login)

module.exports = router