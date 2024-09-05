const {Pool} = require('pg');
require('dotenv').config();


module.exports= new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432
})



console.log(
    process.env.DB_HOST,
    process.env.DB_USER,
    process.env.DB_DATABASE,
    process.env.DB_PASSWORD,
    process.env.DB_PORT || 5432
)
