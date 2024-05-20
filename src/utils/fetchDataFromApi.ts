import env from "../utils/validateEnv";
import { redisClient } from "../utils/connectRedis";
import apiDataType from "../types/apiDataType";
import defaultDataModifier from "../handlers/defaultDataModifier";
import formatTimestamp24hFormat from "./formatTimestamp24hFormat";

const fetchDataFromApi = async (params: apiDataType) => {
    const { apiUrl, apiKey, apiRedisKey, timestampRedisKey, cacheTTL, dataModifier = defaultDataModifier } = params;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const lastRequestTimestamp = Number(await redisClient.get(`${timestampRedisKey}`)) || 0;
    let data;
    let status = 200;

    // if there is no lastRequestTimestamp (data were not fetched yet or ttl expired), fetch the data
    if (!lastRequestTimestamp) {
        console.log("fetching, setting timestamp and data to redis...", formatTimestamp24hFormat(new Date()));

        // TODO check API response or AXIOM
        try {
            //if there is apiKey value fetch with api key
            if (!!apiKey) {
                const response = await fetch(apiUrl, {
                    headers: {
                        "User-agent": env.USER_AGENT,
                        Authorization: apiKey,
                    },
                });
                data = await dataModifier(response);
                console.log("key");

                if (!response.ok) {
                    status = 500;
                    throw new Error("Public API is not available");
                }
            } else {
                const response = await fetch(apiUrl, {
                    headers: {
                        "User-agent": env.USER_AGENT,
                    },
                });
                data = await dataModifier(response);
                console.log("no key");

                if (!response.ok) {
                    status = 500;
                    throw new Error("Public API is not available");
                }
            }

            // TODO check redis response setting data, when not OK throw error
            // if fetch was succesfull set current timestamp to redis with ttl
            // TODO edge case when API sends back JSON with error
            const replySetRedisTimestamp = await redisClient.sendCommand(["SET", `${timestampRedisKey}`, `${currentTimestamp}`, "EX", `${cacheTTL}`]);
            console.log(replySetRedisTimestamp);

            if (replySetRedisTimestamp != "OK") {
                status = 500;
                throw new Error("REDIS is not available");
            }

            // if fetch was succesfull set fetched data to redis
            const replySetRedisData = await redisClient.json.set(apiRedisKey, "$", data);

            console.log(replySetRedisData);

            if (replySetRedisData != "OK") {
                status = 500;
                throw new Error("REDIS is not available");
            }

            redisClient.expire(apiRedisKey, 3600);

            // if there is error fetching, try reading older data from redis, or set data to "Error" for future error handling
        } catch {
            data = (await redisClient.json.get(apiRedisKey)) || "";
            if (data === "") status = 500;
            else status = 200;
        }
        // else there is timestamp read data from redis
    } else {
        data = (await redisClient.json.get(apiRedisKey)) || "";
        if (data === "") status = 500;
        else status = 200;
        console.log("reading from redis...", formatTimestamp24hFormat(new Date()));
    }
    // TODO error handling
    // data return in each case
    return [status, data];
};

export default fetchDataFromApi;
