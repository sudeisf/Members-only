const {Pool} = require('pg');
require('dotenv').config();
const fs = require('fs');

module.exports= new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 6543,
    ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(__dirname + '/prod-ca-2021.crt')
      }
})





