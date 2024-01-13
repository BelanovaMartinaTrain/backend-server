import axios, { AxiosResponse } from "axios";
import { redisClient } from "../server";

const sample_data = {
    name: "Martina",
    lastName: "Belanova",
    keys: ["key1", "key2", "key3"],
};

const fetchDataFromApi = async (apiUrl: string, apiKey: string, cacheKey: string, cacheTTL: number = 3600): Promise<{} | null> => {
    //
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const lastRequestTimestamp = Number(await redisClient.get(`${cacheKey}`)) || 0;

    if (lastRequestTimestamp === 0) {
        await redisClient.sendCommand(["SET", `${cacheKey}`, `${currentTimestamp}`, "EX", `${cacheTTL}`]);

        console.log("setting...");

        const response = await fetch(apiUrl);
        const rawData = await response.json();

        const reply = await redisClient.json.set(apiKey, "$", rawData);
        console.log(reply);

        return rawData;
    } else {
        const rawData = (await redisClient.json.get(apiKey)) || "";

        console.log("in else");

        return rawData;
    }
};

export default fetchDataFromApi;
