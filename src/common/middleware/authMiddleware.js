const jwt = require("jsonwebtoken")

exports.authenticate = (req, res, next) => {
    try {
        const autheader = req.headers.authorization
        if (!autheader || !autheader.startsWith("Bearer")) {
            return res.status(401).json({
                message: "nop tokken provided"
            })
        }
        // console.log("HEADER:", req.headers.authorization);
        const token = autheader.split(" ")[1]
        // console.log("JWT_SECRET:", process.env.JWT_SECRET);
        // console.log("tokken", token)
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decode", decode)
        req.user = decode
        next()
    } catch (err) {
        console.log("JWT ERROR:", err);   // 👈 IMPORTANT
        console.log("MESSAGE:", err.message);
        return res.status(401).json({
            message: "invalid  or expired token"
        })
    }
}