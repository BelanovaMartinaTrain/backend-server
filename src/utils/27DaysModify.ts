import env from "../utils/validateEnv";
import { redisClient } from "../server";
import apiDataType from "../interfaces/apiDataType";

type TLineData = {
    date: string;
    flux: string;
    AKp: string;
    Kp: string;
};

const fetch27DayForecastAndModify = async (params: apiDataType) => {
    const { apiUrl, apiKey, apiRedisKey, timestampRedisKey, cacheTTL } = params;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // when there is no timestamp in redis it's set to 0

    const lastRequestTimestamp = Number(await redisClient.get(`${timestampRedisKey}`)) || 0;
    let data;

    // if there is no timestamp (data were not fetched yet or ttl expired), fetch the data
    if (!lastRequestTimestamp) {
        console.log("fetching, setting timestamp and data to redis...", new Date().toLocaleTimeString([], { hourCycle: "h23", hour: "2-digit", minute: "2-digit" }));

        // TODO check API response or AJAX
        try {
            //if there is apiKey value fetch with api key

            const response = await fetch(apiUrl, {
                headers: {
                    "User-agent": env.USER_AGENT,
                },
            });
            data = await response.text();

            const newLines: TLineData[] = [];
            data.split("\n").forEach((line, index) => {
                if (index > 10 && index < 38)
                    newLines.push({
                        date: `${line.slice(0, 11)}`,
                        flux: `${line.slice(16, 19)}`,
                        AKp: `${line.slice(29, 31).trim()}`,
                        Kp: `${line.slice(41, 42)}`,
                    });
            });

            console.log(newLines);
            console.log("no key");

            // TODO check redis response setting data, when not OK throw error
            // if fetch was succesfull set current timestamp to redis with ttl
            // TODO edge case when API sends back JSON with error
            const replySetRedisTimestamp = await redisClient.sendCommand(["SET", `${timestampRedisKey}`, `${currentTimestamp}`, "EX", `${cacheTTL}`]);
            console.log(replySetRedisTimestamp);

            // if fetch was succesfull set fetched data to redis
            const replySetRedisData = await redisClient.json.set(apiRedisKey, "$", newLines);
            console.log(replySetRedisData);

            // if there is error fetching, try reading older data from redis, or set data to "Error" for future error handling
        } catch {
            data = (await redisClient.json.get(apiRedisKey)) || "Error";
        }
        // else there is timestamp read data from redis
    } else {
        data = (await redisClient.json.get(apiRedisKey)) || "Error";
        console.log("reading from redis...", new Date().toLocaleTimeString([], { hourCycle: "h23", hour: "2-digit", minute: "2-digit" }));
    }
    // TODO error handling
    // data return in each case
    return data;
};

export default fetch27DayForecastAndModify;
