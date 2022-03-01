const app = require('./app');

require('./config/dotenv');
require('./database/connection');

app.listen(process.env.PORT, async () => {    
    console.log("SERVER HAS BEEN STARTED");
});  