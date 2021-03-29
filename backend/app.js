import '@babel/polyfill';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import routes from './routes/appRoutes.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api',routes);

app.listen(PORT, () => {
    console.log('my app listening')
});

export default app;
