const db = require('./db');
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
nunjucks.configure({ noCache: true});

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use('/tweets', require('./routes/tweets'))

app.get('/', (req, res, next)=>{
    res.render('index', { title:  "TWITTER" })
})

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`port: ${port}`)
});