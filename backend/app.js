const express = require('express');
const app = express();
const routes = require('./routes/appRoutes');
const pg = require('pg');
const dotenv = require('dotenv').config();

const PORT = 3000;
const DB_URL = process.env.DB_URL;
let client = new pg.Client(DB_URL);

client.connect(function(err) {
    if (err) {
        return console.error('could not connect to db', err);
    }
    client.query('SELECT NOW() AS "TheTime"', function(err, result) {
        if (err) {
            return console.error('could not run the query', err);
        }
        console.log(result.row);
        client.end();
    })
})

app.use(routes);

app.listen(PORT, () => {
    console.log('my app listening')
})