const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decode = jwt.verify(token, "securetext");
        const user = await User.findOne({ _id: decode._id , "tokens.token" : token});

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(400).send({
            error: "Please Authenticate"
        })
    }
}

module.exports = auth;