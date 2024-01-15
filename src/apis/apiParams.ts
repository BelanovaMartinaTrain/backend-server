import env from "../utils/validateEnv";
import apiDataType from "../interfaces/apiDataType";

export const apiPlanetaryKIndex: apiDataType = {
    apiUrl: "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json",
    apiKey: "",
    apiRedisKey: "planetary_k_index_data",
    timestampRedisKey: "planetary_k_index_ttl",
    cacheTTL: 60,
};

export const apiStormglassWeather = (lat: string, lon: string, params: string) => {
    return {
        apiUrl: `https://api.stormglass.io/v2/weather/point?lat=${lat}&lng=${lon}&params=${params}`,
        apiKey: env.STORMGLASS_API_KEY,
        apiRedisKey: "stormglass_weather_data",
        timestampRedisKey: "stormglass_weather_ttl",
        cacheTTL: 10000,
    };
};
