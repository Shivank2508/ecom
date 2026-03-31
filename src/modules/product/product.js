const supabase = require("../../config/supabase")

exports.products = async (req, res) => {
    const { data: products } = await supabase
        .from("products")
        .select("id,name, description, price")
    res.json({
        code: 1,
        message: "products fetched successfully",
        data: products
    })
}