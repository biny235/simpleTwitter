const db = require('../db')
const app = require('express').Router();



app.get('/', (req, res, next) => {
   db.getTweets((err, tweets)=>{
        if(err){
            next(err)
        }
       res.render('../views/tweets', {title:'Tweets', tweets: tweets})
   }) 
   
});

app.get('/:id', (req, res, next) => {
    const tweetID = req.params.id
    db.getTweet(tweetID, (err, tweet)=>{
        if(err){
            next(err)
        }
        res.render('../views/tweet', {title:`Tweet ${tweetID}`, tweet: tweet})
    }) 
    
 });




module.exports = app;

