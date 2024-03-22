import { cleanEnv, port, str, url } from "envalid";

export default cleanEnv(process.env, {
    PORT: port(),
    REDIS_PASSWORD: str(),
    STORMGLASS_API_KEY: str(),
    USER_AGENT: str(),
    NOAA_API_URL_K_INDEX: url(),
    NOAA_API_URL_SPACE_WEATHER: url(),
    YR_API_URL: url(),
    NOAA_SOLAR_WIND_URL: url(),
    NOAA_MAGNETIC_FIELD: url(),
    NOAA_FLUX: url(),
    NOAA_K_3HR: url(),
    NOAA_SOLAR_WIND_DENSITY_5MIN: url(),
    NOAA_SOLAR_WIND_DENSITY_3DAY: url(),
    NOAA_27_DAYS: url(),
});
