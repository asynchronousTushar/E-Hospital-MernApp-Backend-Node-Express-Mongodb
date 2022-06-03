const express = require('express');
const Admin = require('../models/Admin');
const User = require('../models/User');

const adminRouter = new express.Router();

adminRouter.post('/adminsignup', async (req, res) => {
    let admin = new Admin(req.body);
    const users = await User.find();

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
        const users = await User.find();

        res.send({ admin, users })
    } catch (error) {
        res.status(404).send(error.message);
    }
})





module.exports = adminRouter;
