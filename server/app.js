import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import Connection from './database/db.js';
import DefaultData from './default.js';
import Routes from './routes/route.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', Routes);

// Serverless-safe: cache DB connection + only seed once per cold start
await Connection();
await DefaultData();

export default app;

