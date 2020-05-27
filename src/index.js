const express = require('express');
const app = express();
const morgan = require('morgan');
const router = require('../routes/index');

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(morgan('dev'));

app.use(router);




app.listen(3000, ()=>{
    console.log(`Server listen on port ${3000}`)
});

