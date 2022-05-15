const app = require('./app');

app.listen(process.env.PORT, async () => {
    console.log("SERVER WAS STARTED");
    console.log("LISTENING AT PORT " + process.env.PORT);
});   