const express = require('express');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Issue = require('../models/Issue');

const adminRouter = new express.Router();

adminRouter.post('/adminsignup', async (req, res) => {
    let admin = new Admin(req.body);
    const users = await User.find().lean();
    const issues = await Issue.find()

    users.forEach(user => {
        user.issues = issues.filter(el => el.user === user._id.toString())
    })

    admin.save()
        .then((response) => {
            res.status(201).send({ admin: response, users });
        })
        .catch(e => {
            res.status(400).send(e)
        })
})

adminRouter.post('/adminlogin', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password);
        const users = await User.find().lean();
        const issues = await Issue.find()

        users.forEach((user) => {
            user.issues = issues.filter(el => el.user === user._id.toString())
        })

        res.send({ admin, users })
    } catch (error) {
        res.status(404).send(error.message);
    }
})





module.exports = adminRouter;
