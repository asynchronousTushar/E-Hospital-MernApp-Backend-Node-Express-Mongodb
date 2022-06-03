const express = require('express');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Issue = require('../models/Issue');
const auth = require('../middlewares/auth');

const userRouter = new express.Router();

userRouter.get('/', auth, (req, res) => {
    res.status(200).send({ user: req.user, admins: req.admins });
})

userRouter.post('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        const admins = await Admin.find();
        console.log(admins);
        await user.save()
        res.status(201).send({ user, token, admins })
    }
    catch (error) {
        res.status(400).send(error);
    }
})

userRouter.post('/login', async (req, res) => {

    try {
        const admins = await Admin.find();
        console.log(admins);
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.status(200).send({ user, token, admins })
    } catch (error) {
        res.status(400).send(error);
    }

})

userRouter.post('/logout', auth, async (req, res) => {
    user = req.user;

    try {
        user.tokens = user.tokens.filter((token) => {
            return token.token !== req.token;
        })

        await user.save()
        res.status(200).send()
    } catch (error) {
        res.status(500).send(error);
    }
})

userRouter.post('/requestissue', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.user });
        const admin = await Admin.findOne({ _id: req.body.admin })
        let problem = "";

        if (req.body.issue.trim()) {
            problem = req.body.issue;
        } else {
            throw new Error("Please input your issue");
        }
    
        const issue = new Issue({ user, admin, problem })
        await issue.save();
        res.status(201).send("Issue created successfully");
    }
     catch(err) {
        res.status(400).send({messege: "Something went wrong with the input!"})
    }
})



module.exports = userRouter;