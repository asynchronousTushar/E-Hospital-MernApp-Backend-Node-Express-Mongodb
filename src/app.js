require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/userRouter');
const adminRouter = require('./routers/adminRouter');


const app = express();

app.use(express.json({ limit: '50mb' }))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')

    next();
});

app.use(userRouter);
app.use(adminRouter);

module.exports = app;