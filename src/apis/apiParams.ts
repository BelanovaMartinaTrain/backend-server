import env from "../utils/validateEnv";
import apiDataType from "../interfaces/apiDataType";

export const apiPlanetaryKIndex = (): apiDataType => {
    return {
        apiUrl: env.NOAA_API_URL_K_INDEX,
        apiKey: "",
        apiRedisKey: "planetary_k_index_data",
        timestampRedisKey: "planetary_k_index_ttl",
        cacheTTL: 60,
        source: "NOAA",
    };
};

export const apiSpaceWeather = (): apiDataType => {
    return {
        apiUrl: env.NOAA_API_URL_SPACE_WEATHER,
        apiKey: "",
        apiRedisKey: "sunstorm_events_data",
        timestampRedisKey: "sunstorm_events_ttl",
        cacheTTL: 3600,
        source: "NOAA",
    };
};

export const apiYRMETWeather = (lat: string, lon: string): apiDataType => {
    return {
        apiUrl: env.YR_API_URL + `?lat=${lat}&lon=${lon}`, // TODO shorten lon and lat to int values
        apiKey: "",
        apiRedisKey: `yrmet_weather_data_${lat}_${lon}`,
        timestampRedisKey: `yrmet_weather_ttl_${lat}_${lon}`,
        cacheTTL: 1800,
        source: "MET Norway",
    };
};
