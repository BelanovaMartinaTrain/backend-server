import app from "./app";
import env from "./utils/validateEnv";
import redis from "redis";

const port = env.PORT;
const redisClient = redis.createClient();

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
