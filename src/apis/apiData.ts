import apiDataInterface from "../interfaces/apiDataInterface";

export const apiPlanetaryKIndex: apiDataInterface = {
    apiUrl: "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json",
    apiKey: "",
    apiRedisKey: "planetary_k_index",
    cacheDataKey: "last_api_request_time",
    cacheTTL: 3600,
};
