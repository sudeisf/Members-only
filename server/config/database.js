const {Pool} = require('pg');
require('dotenv').config();


module.exports= new Pool({
    host: 'localhost',
    user: 'user',
    password: process.env.DB_PASSWORD,
    port: 5432
})