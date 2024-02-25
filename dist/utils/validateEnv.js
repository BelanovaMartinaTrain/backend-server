"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_1.port)(),
    REDIS_PASSWORD: (0, envalid_1.str)(),
    STORMGLASS_API_KEY: (0, envalid_1.str)(),
    USER_AGENT: (0, envalid_1.str)(),
    NOAA_API_URL_K_INDEX: (0, envalid_1.url)(),
    NOAA_API_URL_SPACE_WEATHER: (0, envalid_1.url)(),
    YR_API_URL: (0, envalid_1.url)(),
    NOAA_SOLAR_WIND_URL: (0, envalid_1.url)(),
    NOAA_MAGNETIC_FIELD: (0, envalid_1.url)(),
    NOAA_FLUX: (0, envalid_1.url)(),
    NOAA_K_3HR: (0, envalid_1.url)(),
    NOAA_SOLAR_WIND_DENSITY_5MIN: (0, envalid_1.url)(),
    NOAA_SOLAR_WIND_DENSITY_3DAY: (0, envalid_1.url)(),
});
