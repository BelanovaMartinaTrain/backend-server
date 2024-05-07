import "dotenv/config";
import env from "./utils/validateEnv";

import createApp from "./createApp";
import { fetchAndSaveOvationImage } from "./scripts/fetchAnOvationImage";
import { connectRedis } from "./utils/connectRedis";

const app = createApp();

const port = env.PORT || 8080;

fetchAndSaveOvationImage("north");
fetchAndSaveOvationImage("south");

setInterval(() => fetchAndSaveOvationImage("north"), 5 * 60 * 1000);
setInterval(() => fetchAndSaveOvationImage("south"), 5 * 60 * 1000);

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);

    await connectRedis();
});
