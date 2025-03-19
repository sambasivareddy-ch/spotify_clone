import { Router, Request, Response } from 'express';

import { getRedisClient } from '../../db/redis';
import { RedisClientType } from 'redis';
import { RedisUserCacheType } from '../../types/redisUserCacheType';

const router: Router = Router();

// Callback routes
router.get('/', async (req: Request, res: Response): Promise<void> => {
    const code: string  = req.query.code as string;
    const state: string  = req.query.state as string;
    const error: string = req.query.error as string;

    if (error) {
        console.error(`Error: ${error}`);
        res.send(`Error: ${error}`);
        return;
    }

    if (!code || !state) {
        console.error('Invalid code or state');
        res.send('Invalid code or state');
        return;
    }

    const redisClient: RedisClientType | null = getRedisClient();
    let storedState: string | null = null;
    if (redisClient) {
        await redisClient.get('state').then((reply: string | null) => {
            storedState = reply;
        });
    }

    if (state !== storedState) {
        console.error('State mismatch');
        res.send('State mismatch');
        return;
    }

    redisClient?.del('state');
    
    // Exchange the code for an access token and refresh token
    // Save the tokens in Redis
    // Redirect to the frontend
    const client_id: string | undefined = process.env.CLIENT_ID;
    const client_secret: string | undefined = process.env.CLIENT_SECRET;
    const request_uri: string = process.env.REQUEST_URI || "";
    const redirect_uri: string = process.env.REDIRECT_URI || "";

    try {
        const response = await fetch(request_uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri
            })
        });

        const data = await response.json();
        const access_token: string = data.access_token;
        const refresh_token: string = data.refresh_token;

        if (redisClient) {
            const redisUserCache: RedisUserCacheType = {
                access_token,
                refresh_token
            };
            redisClient.set('user', JSON.stringify(redisUserCache));
        }

        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: true,
            maxAge: 3600000
        });

        res.redirect('http://localhost:5173/categories');
    } catch (err) {
        console.error(`Error: ${err}`);
        res.send(`Error: ${err}`);
    }
});

export default router;