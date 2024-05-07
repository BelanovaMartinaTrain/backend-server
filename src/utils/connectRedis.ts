import { RedisClientType, createClient } from "redis";
import env from "../utils/validateEnv";

const redisPassword = env.REDIS_PASSWORD;

export const redisClient: RedisClientType = createClient({
    password: redisPassword,
    socket: {
        host: "redis-17111.c327.europe-west1-2.gce.cloud.redislabs.com",
        port: 17111,
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
