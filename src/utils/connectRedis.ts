import { RedisClientType, createClient } from "redis";
import env from "../utils/validateEnv";

const redisPassword = env.REDIS_PASSWORD;

export const redisClient: RedisClientType = createClient({
    username: "default",
    password: redisPassword,
    socket: {
        host: "redis-14641.c270.us-east-1-3.ec2.redns.redis-cloud.com",
        port: 14641,
    },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

export async function connectRedis() {
    redisClient
        .connect()
        .then(() => {
            console.log("Redis connected");
        })
        .catch(console.error);
}
