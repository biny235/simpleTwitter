const db = require('../db')
const app = require('express').Router();


app.get('/', (req, res, next) => {
    res.render('../views/tweets')

});

module.exports = app;

