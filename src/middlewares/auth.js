const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Admin = require('../models/Admin');
const Issue = require('../models/Issue');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decode = jwt.verify(token, "securetext");
        const user = await User.findOne({ _id: decode._id, "tokens.token": token });
        const admins = await Admin.find();
        const issues = await Issue.find({user: user._id.toString()})

        if (!user) {
            throw new Error();
        }

        req.admins = admins;
        req.user = user;
        req.token = token;
        req.issues = issues;
        next();
    } catch (error) {
        res.status(400).send({
            error: "Please Authenticate"
        })
    }
}

module.exports = auth;