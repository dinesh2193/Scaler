const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try{
        console.log("req header", req.headers.authorization)
        const token = req.headers.authorization.split(" ")[1]
        console.log("token", token)
        if(!token) return res.status(401).send({
            message: "Access denied. No token provided.",
            success: false
        })
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded token", decoded)
        req.body.userId = decoded.userId
        next()
    }catch(err){
        console.log(err)
        res.status(400).send({
            message: "Error in parsing token",
            success: false,
        })
    }
}

module.exports = auth