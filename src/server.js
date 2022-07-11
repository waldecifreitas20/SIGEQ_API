const app = require('./app');

app.listen(process.env.PORT, async () => {
    console.log("SERVER HAS BEEN STARTED");
    console.log("LISTENING AT PORT " + process.env.PORT);
});   