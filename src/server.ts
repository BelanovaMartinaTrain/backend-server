import app from "./app";
import env from "./utils/validateEnv";
import { RedisClientType, createClient } from "redis";

const port = env.PORT;
const redisPassword = env.REDIS_PASSWORD;

export const redisClient: RedisClientType = createClient({
    password: redisPassword,
    socket: {
        host: "redis-17111.c327.europe-west1-2.gce.cloud.redislabs.com",
        port: 17111,
    },
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));

redisClient
    .connect()
    .then(() => {
        console.log("Redis connected");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(console.error);
