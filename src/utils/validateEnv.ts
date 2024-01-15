import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    PORT: port(),
    REDIS_PASSWORD: str(),
    STORMGLASS_API_KEY: str(),
    USER_AGENT: str(),
    NOAA_API_URL_K_INDEX: str(),
    YR_API_URL: str(),
});
