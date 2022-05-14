const app = require('./app');

app.listen(process.env.PORT, async () => {
    console.log("SERVER WAS STARTED");
    console.log("IT LISTENING AT PORT " + process.env.PORT);
});   