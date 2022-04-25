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
        res.status(400).send('invalid input data!')
    })
})


















module.exports = adminRouter;
