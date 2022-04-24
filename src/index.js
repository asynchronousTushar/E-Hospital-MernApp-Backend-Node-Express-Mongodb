const app = require('./app');

const port = process.env.Port || 3006;

app.listen(port, () => {
    console.log("App started at", port);
})