
const { registerUser, loginUser } = require("../../common/middleware/register")
const { generateAccessToken, generateRefereshToken } = require("../../common/utils/jwt")
const { registerSchema, loginSchema } = require("./validation")
const supabase = require("../../config/supabase")


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
        res.json({
            code: 1,
            message: "login SuccessFully",
            accessToken,
            refreshToken
        })
    } catch (err) {
        res.status(400).json({
            err: err.message
        })
    }
}



