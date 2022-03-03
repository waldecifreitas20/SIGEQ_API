const app = require('./app');

require('./config/dotenv');
require('./database/connection');
const a = require('./api/models')('Permission');

require('./api/controllers')(app);


app.listen(process.env.PORT, async () => {    
    console.log("SERVER HAS BEEN STARTED");
});   