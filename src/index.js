const app = require('./app');

require('./config/dotenv');
require('./database/connection');

require('./app/controllers')(app);

app.get('/', (req, res) => {
    return res.send('alo');
});

app.listen(process.env.PORT, async () => {    
    console.log("SERVER HAS BEEN STARTED");
});  