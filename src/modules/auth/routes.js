const express = require("express")
const { register, login, refresh } = require("./controller")
const { authenticate } = require("../../common/middleware/authMiddleware")
const { products } = require("../product/product")


const router = express.Router()


router.post("/register", register)
router.post("/login", login)
router.post("/refresh", refresh)
router.get("/products", authenticate, products)
router.get("/all", authenticate, async (req, res) => {
    res.json({
        message: "Protected route",
        user: req.user
    })
})

module.exports = router


