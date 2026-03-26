

const supabase = require("../../config/supabase");
const { hashPassword, comparePassword } = require("../utils/hash");




exports.registerUser = async (data) => {
    const hashedPassword = await hashPassword(data.password);

    const { data: user, error } = await supabase
        .from("users")
        .insert([
            {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        ])
        .select()
        .single()

    if (error) throw new Error(error.message)

    return user
}

exports.loginUser = async (data) => {
    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", data.email)
        .single()

    if (error) throw new Error(error.message)
    const isMatch = comparePassword(data.password, user.password)

    if (!isMatch) {
        throw new Error("password is not correct")
    }

    return user

}