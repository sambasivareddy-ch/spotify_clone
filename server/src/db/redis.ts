import { createClient, RedisClientType } from 'redis';

// Redis client instance
let redisClient: RedisClientType | null = null;

// Initialize Redis client
export const initializeRedis = async (): Promise<void> => {
    redisClient = createClient();

    redisClient.on('connect', () => {
        console.log('Connected to Redis');
    });

    redisClient.on('error', (err: Error) => {
        console.error(`Error: ${err}`);
    });

    redisClient.on('end', () => {
        console.log('Disconnected from Redis');
    });

    try {
        await redisClient.connect();
        console.log('Redis client connected successfully');
    } catch (err) {
        console.error(`Error connecting to Redis: ${err}`);
    }
}

// Get Redis client
export const getRedisClient = (): RedisClientType | null => {
    if (!redisClient) {
        console.error('Redis client not initialized');
    }
    return redisClient;
}

// Close Redis client
export const closeRedis = async (): Promise<void> => {
    if (redisClient) {
        await redisClient.quit();
        redisClient = null;
        console.log('Redis client disconnected successfully');
    }
}