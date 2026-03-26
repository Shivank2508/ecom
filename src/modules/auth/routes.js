const express = require("express")
const { register, login } = require("./controller")
const { authenticate } = require("../../common/middleware/authMiddleware")


const router = express.Router()


router.post("/register", register)
router.post("/login", login)
router.get("/all", authenticate, async (req, res) => {
    res.json({
        message: "Protected route",
        user: req.user
    })
})

module.exports = router

