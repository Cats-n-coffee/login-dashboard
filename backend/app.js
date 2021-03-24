import express from 'express';
import routes from './routes/appRoutes.js';
import dotenv from 'dotenv';
import '@babel/polyfill';

dotenv.config();

const app = express();
const PORT = 3000;
const DB_URL = process.env.DB_URL;
// const client = new pg.Client(DB_URL);

// client.connect()
// .then(() => console.log('success'))
// // .then(() => client.query("insert into users values ($1, $2)", [1, "lucie"]))
// .then(() => client.query("select * from users"))
// .then(results => console.table(results.rows))
// .catch(err => console.log('could not connect to db', err))
// .finally(() => client.end())

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
    console.log('my app listening')
});

export default app;
