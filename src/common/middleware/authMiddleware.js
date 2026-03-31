const jwt = require("jsonwebtoken")

exports.authenticate = (req, res, next) => {
    try {
        const autheader = req.headers.authorization
        if (!autheader || !autheader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "nop tokken provided"
            })
        }
        const token = autheader.split(" ")[1]
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (err) {
        return res.status(401).json({
            message: "invalid  or expired token",
            err: err.message
        })
    }
}