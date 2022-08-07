const {initDatabase} = require('../../../src/database/db');
const connectDB = require('../../../src/database/connection');

connectDB();
initDatabase();