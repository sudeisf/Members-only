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
        rejectUnauthorized: true, // Enforces certificate validation
        ca: fs.readFileSync('C://Users//sudei//Documents//members-only//prod-ca-2021.crt').toString(),
    },
})





