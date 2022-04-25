const express = require('express');
const Admin = require('../models/Admin');

const adminRouter = new express.Router();

adminRouter.post('/adminsignup', (req, res) => {
    let admin = new Admin(req.body);

    admin.save()
    .then((response) => {
        res.status(201).send(response);
    })
    .catch(e => {
        res.status(400).send(e)
    })
})

adminRouter.post('/adminlogin', async (req, res) => {
    try {
        const admin = await Admin.findByCredentials(req.body.email, req.body.password);

        res.send(admin)
    } catch (error) {
        res.status(404).send(error.message);
    }
})
















module.exports = adminRouter;
