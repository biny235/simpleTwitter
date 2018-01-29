const db = require('./db');
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path')
const app = express();
nunjucks.configure({ noCache: true});

db.sync((err)=>{
    if(err) return console.log(err);
    db.getTweets((err,tweets)=>{
        if(err) return console.log(err);
        console.log(`there are ${tweets.length} tweets`);
        db.seed((err)=>{
            if(err) return console.log(err);
        });
        db.getTweets((err, tweets)=>{
            if(err) return console.log(err);
            console.log(tweets);
            db.getTweet(1, (err, tweet)=>{
                if(err) return console.log(err);
                console.log(`Tweet 1 is ${tweet.tweet}`);

            });
        });
    });
});


app.set('view engine', 'html');
app.engine('html', nunjucks.render);

app.use('/vendor', express.static(path.join(__dirname, 'node_modules')))

app.use((req, res, next)=>{
    res.locals.path = req.url;
    next();
});
app.use('/tweets', require('./routes/tweets'))

app.get('/', (req, res, next)=>{
    res.render('index', { title:  "TWITTER" })
});

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`port: ${port}`)
});