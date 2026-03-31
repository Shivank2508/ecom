// ✅ 1. LOAD ENV FIRST (VERY IMPORTANT)
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")

const router = require("./modules/auth/routes");

const app = express();
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173", // your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Server working ✅");
});

app.use("/api", router)






app.listen(8000, () => {
    console.log("server is running on 8000");
});