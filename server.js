const express = require('express');
const path = require('path');
const axios = require('axios');
const redis = require('redis')


// hinzufügen des Redis-Client


const redisClient = redis.createClient();

(async ()=> {

    redisClient.on('error', (err) =>{
        console.error("Redis client error", err)
    })

    redisClient.on('ready', () =>{

          console.log("Redis client is ready");

    })

    await redisClient.connect();

    await redisClient.ping();


})();

//unverändert
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');

app.locals.dateFns = require('date-fns');

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Big Data News',
    });
});

async function searchHN(query) {
    const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&hitsPerPage=90`
    );
    return response.data;
}

app.get('/search', async (req, res, next) => {
    try {
        const searchQuery = req.query.q;
        if (!searchQuery) {
            res.redirect(302, '/');
            return;
        }

       //hier kommt der Teil in dem wir den Caching-Teil bauen

        let results = null;

        const key = "search:" + searchQuery.toLowerCase();
        const value = await redisClient.get(key);

        if(value){
            results = JSON.parse(value)
            console.log("Cache-HIT")
        }else{
            results = await searchHN(searchQuery);
            await redisClient.set(key, JSON.stringify(results), {
                EX: 300  //"Expire-Time für den Cache-Eingang" 300 Sekunden => nach 300 Sekunden
            })
            console.log("Cache MISS");
        }

        //Ende Caching-Teil

        res.render('search', {
            title: `Search results for: ${searchQuery}`,
            searchResults: results,
            searchQuery,
        });
    } catch (err) {
        next(err);
    }
});

app.use(function (err, req, res, next) {
    console.error(err);
    res.set('Content-Type', 'text/html');
    res.status(500).send('<h1>Internal Server Error</h1>');
});

const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Big Data server started on port: ${server.address().port}`);
});