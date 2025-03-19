import { Router, Request, Response } from 'express';
import querystring from 'querystring';
import { RedisClientType } from 'redis';

import { generateRandomString } from '../../utils/utils';
import { getRedisClient } from '../../db/redis';

const router: Router = Router();

// Login route
router.get('/', (req: Request, res: Response) => {
    const client_id: string | undefined = process.env.CLIENT_ID;
    const redirect_uri: string | undefined = process.env.REDIRECT_URI;
    const state: string = generateRandomString(16);
    const scope: string = 'user-read-private user-read-email';

    const queryParams: string = querystring.stringify({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri,
        state
    });

    const redisClient: RedisClientType | null = getRedisClient();
    if (redisClient) {
        redisClient.set('state', state);
    }

    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

export default router;