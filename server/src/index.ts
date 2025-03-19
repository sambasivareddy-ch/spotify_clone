import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import loginRouter from './routes/auth/login';
import callbackRouter from './routes/auth/callback';
import getCategories from './routes/api/get-categories';
import { initializeRedis } from './db/redis';

const app: Express = express();

// Configurations and environment variables setup
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = process.env.PORT || 3000;
app.use(cors<Request>({
    origin: 'http://localhost:5173',   
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
app.use(cookieParser());

// Initialize Redis client
initializeRedis();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.use('/login', loginRouter);
app.use('/callback', callbackRouter);
app.use('/api/get-categories', getCategories);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});