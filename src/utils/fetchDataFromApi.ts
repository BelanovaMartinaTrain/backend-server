//import axios, { AxiosResponse } from "axios";
import { redisClient } from "../server";
import apiDataInterface from "../interfaces/apiDataInterface";

//apiUrl: string, apiKey: string, cacheDataKey: string, cacheTTL: number = 3600

const fetchDataFromApi = async (params: apiDataInterface): Promise<{} | null> => {
    const { apiUrl, apiKey, apiRedisKey, cacheDataKey, cacheTTL } = params;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const lastRequestTimestamp = Number(await redisClient.get(`${cacheDataKey}`)) || 0;

    if (lastRequestTimestamp === 0) {
        await redisClient.sendCommand(["SET", `${cacheDataKey}`, `${currentTimestamp}`, "EX", `${cacheTTL}`]);

        console.log("setting...");

        const response = await fetch(apiUrl);
        const rawData = await response.json();

        const reply = await redisClient.json.set(apiRedisKey, "$", rawData);
        console.log(reply);

        return rawData;
    } else {
        const rawData = (await redisClient.json.get(apiRedisKey)) || "";

        console.log("in else");

        return rawData;
    }
};

export default fetchDataFromApi;
