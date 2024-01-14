import apiDataType from "../interfaces/apiDataType";

export const apiPlanetaryKIndex: apiDataType = {
    apiUrl: "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json",
    apiKey: "",
    apiRedisKey: "planetary_k_index_data",
    timestampRedisKey: "planetary_k_index_ttl",
    cacheTTL: 3600,
};
