
const { registerUser, loginUser } = require("../../common/middleware/register")
const { generateAccessToken, generateRefereshToken } = require("../../common/utils/jwt")
const { registerSchema, loginSchema } = require("./validation")
const supabase = require("../../config/supabase")
const jwt = require("jsonwebtoken")


exports.register = async (req, res) => {
    try {
        const validated = registerSchema.parse(req.body)
        const user = await registerUser(validated)
        res.status(201).json({
            code: 1,
            message: "user generated successfully",
            user
        })
    } catch (err) {
        res.status(400).json({
            err: err.message
        })
    }
}


exports.login = async (req, res) => {
    try {
        const validated = loginSchema.parse(req.body)
        const user = await loginUser(validated)
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefereshToken(user)
        await supabase
            .from("users")
            .update({ refresh_token: refreshToken })
            .eq("id", user.id)

        const { data: users } = await supabase
            .from("users")
            .select("id, name, email")
            .eq("id", user.id)
            .single()

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
        })
        res.json({
            code: 1,
            message: "login SuccessFully",
            user: users,
            accessToken
        })
    } catch (err) {
        res.status(400).json({
            err: err.message
        })
    }
}


exports.refresh = async (req, res) => {
    try {
        const token = req.cookies.refreshToken
        if (!token) {
            return res.status(401).json({
                message: "no token provided"
            })
        }
        const decod = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
        const newAccessToken = generateAccessToken({ id: decod.id, name: decod.name })
        res.status(200).json({
            code: 1,
            message: "token refreshed successfully",
            newAccessToken: newAccessToken
        })
    } catch (err) {
        res.status(400).json({
            err: err.message
        })
    }

}



