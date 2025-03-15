import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import loginRouter from './routes/login';
import callbackRouter from './routes/callback';
import { initializeRedis } from './db/redis';

const app: Express = express();

// Configurations and environment variables setup
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use(cors<Request>());

// Initialize Redis client
initializeRedis();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/login', loginRouter);
app.use('/callback', callbackRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});