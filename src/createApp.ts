import "dotenv/config";
import cors from "cors";
import express from "express";
import routes from "./routes";
const morgan = require("morgan");

function createApp() {
    const app = express();

    app.use(cors());

    // app.use(
    //     cors({
    //         origin: "https://auroraforecast.online/",
    //     })
    // );

    app.use(express.json());
    app.use(express.static("public"));

    app.use(morgan("dev"));

    routes(app);

    return app;
}

export default createApp;
