const express = require('express');
const cors = require('cors');
const connection = require('../database');
const CategoryRouter = require('../../api/route/Category')
const ArticleRouter = require('../../api/route/Article')

const app = express();


connection.authenticate()
        .then(() => console.log('Connection established successfully'))
        .catch(error => console.log(error))  


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors())

app.use('/api/v1',CategoryRouter);
app.use('/api/v1',ArticleRouter);


module.exports = app;