import { redisClient } from "../server";
import apiDataType from "../interfaces/apiDataType";

const fetchDataFromApi = async (params: apiDataType): Promise<{} | null> => {
    const { apiUrl, apiKey, apiRedisKey, timestampRedisKey, cacheTTL } = params;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const lastRequestTimestamp = Number(await redisClient.get(`${timestampRedisKey}`)) || 0;

    if (lastRequestTimestamp === 0) {
        console.log("setting...");

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const replyRedisTimestamp = await redisClient.sendCommand(["SET", `${timestampRedisKey}`, `${currentTimestamp}`, "EX", `${cacheTTL}`]);
            console.log(replyRedisTimestamp);

            const replyRedisData = await redisClient.json.set(apiRedisKey, "$", data);
            console.log(replyRedisData);

            return data;
        } catch {
            const data = (await redisClient.json.get(apiRedisKey)) || "Error";

            return data;
        }
    } else {
        const data = (await redisClient.json.get(apiRedisKey)) || "Error";
        console.log("in else");

        return data;
    }
};

export default fetchDataFromApi;
