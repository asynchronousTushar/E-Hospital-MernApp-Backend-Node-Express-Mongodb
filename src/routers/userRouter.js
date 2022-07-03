const express = require('express');
const User = require('../models/User');
const Admin = require('../models/Admin');
const Issue = require('../models/Issue');
const auth = require('../middlewares/auth');
const mongoose = require('mongoose');

const userRouter = new express.Router();

userRouter.get('/', auth, (req, res) => {
    res.status(200).send({ user: req.user, admins: req.admins, issues: req.issues });
})

userRouter.post('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        const admins = await Admin.find();
        const issues = await Issue.find({ user: user._id.toString() })
        await user.save()
        res.status(201).send({ user, token, admins, issues })
    }
    catch (error) {
        res.status(400).send(error);
    }
})

userRouter.post('/login', async (req, res) => {

    try {
        const admins = await Admin.find();
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        const issues = await Issue.find({ user: user._id.toString() })
        res.status(200).send({ user, token, admins, issues })
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
    let { user, fullName, age, description, bloodGroup, preferredDoctor } = req.body;

    try {
        if (description.trim().length < 40) {
            throw new Error("Please describe more about your issue.", { statusCode: 408 })
        }

        if (!mongoose.Types.ObjectId.isValid(preferredDoctor) && preferredDoctor !== 'anonymous') {
            throw new Error("Invalid preferred Doctor id.")
        }

        if (preferredDoctor === 'anonymous') {
            const issue = new Issue({
                user,
                issue: {
                    fullName,
                    age,
                    description,
                    bloodGroup
                }
            })

            await issue.save()

            res.status(201).send(issue)

        } else {
            const issue = new Issue({
                user,
                preferredDoctor,
                issue: {
                    fullName,
                    age,
                    description,
                    bloodGroup
                }
            })

            await issue.save()

            res.status(201).send(issue)
        }

    } catch (error) {
        res.status(400).send({ error: error.message })
    }

})



module.exports = userRouter;