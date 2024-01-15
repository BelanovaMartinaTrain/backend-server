import env from "../utils/validateEnv";
import { redisClient } from "../server";
import apiDataType from "../interfaces/apiDataType";

const fetchDataFromApi = async (params: apiDataType): Promise<{} | null> => {
    const { apiUrl, apiKey, apiRedisKey, timestampRedisKey, cacheTTL } = params;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // when there is no timestamp in redis it's set to 0
    const lastRequestTimestamp = Number(await redisClient.get(`${timestampRedisKey}`)) || 0;
    let data;

    // if there is no timestamp (data were not fetched yet or ttl expired), fetch the data
    if (!lastRequestTimestamp) {
        console.log("fetching, setting timestamp and data to redis...");

        try {
            //if there is apiKey value fetch with api key
            if (!!apiKey) {
                const response = await fetch(apiUrl, {
                    headers: {
                        "User-agent": env.USER_AGENT,
                        Authorization: apiKey,
                    },
                });
                data = await response.json();
                console.log("key");
            } else {
                const response = await fetch(apiUrl, {
                    headers: {
                        "User-agent": env.USER_AGENT,
                    },
                });
                data = await response.json();
                console.log("no key");
            }

            // if fetch was succesfull set current timestamp to redis with ttl
            // TODO edge case when API sends back JSON with error
            const replySetRedisTimestamp = await redisClient.sendCommand(["SET", `${timestampRedisKey}`, `${currentTimestamp}`, "EX", `${cacheTTL}`]);
            console.log(replySetRedisTimestamp);

            // if fetch was succesfull set fetched data to redis
            const replySetRedisData = await redisClient.json.set(apiRedisKey, "$", data);
            console.log(replySetRedisData);

            //if there is error fetching, try reading older data from redis, or set data to "Error" for future error handling
        } catch {
            data = (await redisClient.json.get(apiRedisKey)) || "Error";
        }
        // else there is timestamp read data from redis
    } else {
        data = (await redisClient.json.get(apiRedisKey)) || "Error";
        console.log("reading from redis...");
    }
    // data return in each case
    return data;
};

export default fetchDataFromApi;
