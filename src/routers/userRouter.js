const express = require('express');
const User = require('../models/User');
const auth = require('../middlewares/auth');

const userRouter = new express.Router();

userRouter.get('/', auth, (req, res) => {
    res.status(200).send(req.user);
})

userRouter.post('/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        await user.save()
        res.status(201).send({ user, token })
    }
    catch (error) {
        res.status(400).send(error);
    }
})

userRouter.post('/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.status(200).send({ user, token })
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

module.exports = userRouter;