const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);

client.connect();

const SQL_SYNC = `
    DROP TABLE IF EXISTS tweets;
    CREATE TABLE tweets(
        id SERIAL PRIMARY KEY,
        tweet VARCHAR(255)
    );`;
const GET_TWEETS = `SELECT * FROM tweets`;
const SQL_SEED =  `
    INSERT INTO tweets(tweet) VALUES ('this is the first tweet');
    INSERT INTO tweets(tweet) VALUES ('this is the second tweet');
    INSERT INTO tweets(tweet) VALUES ('this is the third tweet');
`
const sync = (cb)=>{
    client.query(SQL_SYNC, cb);

}
const getTweets = (cb)=>{
    client.query(GET_TWEETS, (err, result)=>{
        if(err) return cb(err);
        cb(null, result.rows);

    });
};
const getTweet= (id, cb)=>{
    client.query('SELECT * FROM tweets WHERE id=$1', [ id ] , (err, result)=>{
        if(err) return cb(err);
        cb(null, result.rows.length ? result.rows[0]: null);

    });
};

const seed = (cb)=>{
    client.query(SQL_SEED, cb);
};

module.exports = {
    sync,
    getTweets,
    seed,
    getTweet
};