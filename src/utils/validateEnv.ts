import { cleanEnv, port, str } from "envalid";

export default cleanEnv(process.env, {
    PORT: port(),
    REDIS_PASSWORD: str(),
    STORMGLASS_API_KEY: str(),
});
