const express = require('express');
const app = express();
const path  = require('path');
const bodoyParser = require('body-parser');


app.use(express.static(path.join(__dirname,'Public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());















app.listen(3001,()=>{
    console.log('server connected\n http://localhost:3001   ');
})