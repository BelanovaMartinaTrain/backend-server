"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiPlanetaryK3h = exports.apiYRMETWeather = exports.apiFlux = exports.apiMagneticField = exports.apiSolarWind = exports.apiSpaceWeather = exports.apiPlanetaryKIndex = void 0;
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const apiPlanetaryKIndex = () => {
    return {
        apiUrl: validateEnv_1.default.NOAA_API_URL_K_INDEX,
        apiKey: "",
        apiRedisKey: "planetary_k_index_data",
        timestampRedisKey: "planetary_k_index_ttl",
        cacheTTL: 60,
        source: "NOAA",
    };
};
exports.apiPlanetaryKIndex = apiPlanetaryKIndex;
const apiSpaceWeather = () => {
    return {
        apiUrl: validateEnv_1.default.NOAA_API_URL_SPACE_WEATHER,
        apiKey: "",
        apiRedisKey: "sunstorm_events_data",
        timestampRedisKey: "sunstorm_events_ttl",
        cacheTTL: 3600,
        source: "NOAA",
    };
};
exports.apiSpaceWeather = apiSpaceWeather;
const apiSolarWind = () => {
    return {
        apiUrl: validateEnv_1.default.NOAA_SOLAR_WIND_URL,
        apiKey: "",
        apiRedisKey: "solar_wind_data",
        timestampRedisKey: "solar_wind_ttl",
        cacheTTL: 60,
        source: "NOAA",
    };
};
exports.apiSolarWind = apiSolarWind;
const apiMagneticField = () => {
    return {
        apiUrl: validateEnv_1.default.NOAA_MAGNETIC_FIELD,
        apiKey: "",
        apiRedisKey: "magnetic_field_data",
        timestampRedisKey: "magnetic_field_ttl",
        cacheTTL: 60,
        source: "NOAA",
    };
};
exports.apiMagneticField = apiMagneticField;
const apiFlux = () => {
    return {
        apiUrl: validateEnv_1.default.NOAA_FLUX,
        apiKey: "",
        apiRedisKey: "flux_data",
        timestampRedisKey: "flux_ttl",
        cacheTTL: 60,
        source: "NOAA",
    };
};
exports.apiFlux = apiFlux;
const apiYRMETWeather = (lat, lon) => {
    return {
        apiUrl: validateEnv_1.default.YR_API_URL + `?lat=${lat}&lon=${lon}`, // TODO shorten lon and lat to int values
        apiKey: "",
        apiRedisKey: `yrmet_weather_data_${lat}_${lon}`,
        timestampRedisKey: `yrmet_weather_ttl_${lat}_${lon}`,
        cacheTTL: 1800,
        source: "MET Norway",
    };
};
exports.apiYRMETWeather = apiYRMETWeather;
const apiPlanetaryK3h = () => {
    return {
        apiUrl: validateEnv_1.default.NOAA_K_3HR,
        apiKey: "",
        apiRedisKey: "planetary_k_3h_data",
        timestampRedisKey: "planetary_k_3h_ttl",
        cacheTTL: 60,
        source: "NOAA",
    };
};
exports.apiPlanetaryK3h = apiPlanetaryK3h;
