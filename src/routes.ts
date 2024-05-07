import "dotenv/config";
import fetchDataFromApi from "./utils/fetchDataFromApi";
import fetchAndModifyKIndex from "./handlers/modifyKIndex";
import { apiPlanetaryKIndex, apiSpaceWeather, apiYRMETWeather10Hours, apiYRMETWeatherComplete, apiSolarWind, apiMagneticField, apiFlux, apiPlanetaryK3h, apiSolarWindDensity5Min, apiSolarWindDensity3Day, api27Day } from "./apis/apiParams";
import { imageTransformationHandler } from "./handlers/imageTranformationHandler";
import { Express, Request, Response, NextFunction } from "express";
import planetaryKIndexController from "./controllers/planetaryKIndexController";

function routes(app: Express) {
    app.get("/api/planetary-k-index", planetaryKIndexController);

    app.get("/api/planetary-k-index-mod", async (req: Request, res: Response) => {
        const apiData = apiPlanetaryKIndex();
        const data = await fetchAndModifyKIndex(apiData);
        res.status(200).json(data);
    });

    app.get("/api/sunstorm-events", async (req: Request, res: Response) => {
        const apiData = apiSpaceWeather();
        const [status, data] = await fetchDataFromApi(apiData);
        res.status(status).json(data);
    });

    app.get("/api/solar-wind-density-5min", async (req: Request, res: Response) => {
        const apiData = apiSolarWindDensity5Min();
        const [status, data] = await fetchDataFromApi(apiData);
        res.status(status).json(data);
    });

    app.get("/api/solar-wind-density-3day", async (req: Request, res: Response) => {
        const apiData = apiSolarWindDensity3Day();
        const [status, data] = await fetchDataFromApi(apiData);
        res.status(status).json(data);
    });

    app.get("/api/solar-wind", async (req: Request, res: Response) => {
        const apiData = apiSolarWind();
        const [status, data] = await fetchDataFromApi(apiData);
        res.status(status).json(data);
    });

    app.get("/api/magnetic-field", async (req: Request, res: Response) => {
        const apiData = apiMagneticField();
        const [status, data] = await fetchDataFromApi(apiData);
        res.status(status).json(data);
    });

    app.get("/api/flux", async (req: Request, res: Response) => {
        const apiData = apiFlux();
        const [status, data] = await fetchDataFromApi(apiData);
        res.status(status).json(data);
    });

    app.get("/api/yr-met-weather-10hours", async (req: Request, res: Response) => {
        const lat = isNaN(Number(req.query.lat)) ? null : String(req.query.lat);
        const lon = isNaN(Number(req.query.lon)) ? null : String(req.query.lon);

        if (!lat || !lon) {
            res.status(500).send("Longitute and latitude are required");
        } else {
            const apiData = apiYRMETWeather10Hours(lat, lon);
            const [status, data] = await fetchDataFromApi(apiData);
            res.status(status).json(data);
        }
    });

    app.get("/api/yr-met-weather-complete", async (req: Request, res: Response) => {
        const lat = isNaN(Number(req.query.lat)) ? null : String(req.query.lat);
        const lon = isNaN(Number(req.query.lon)) ? null : String(req.query.lon);

        if (!lat || !lon) {
            res.status(500).send("Longitute and latitude are required");
        } else {
            const apiData = apiYRMETWeatherComplete(lat, lon);
            const [status, data] = await fetchDataFromApi(apiData);
            res.status(status).json(data);
        }
    });

    app.get("/api/planetary-k-3h", async (req: Request, res: Response) => {
        const apiData = apiPlanetaryK3h();
        const [status, data] = await fetchDataFromApi(apiData);
        res.status(status).json(data);
    });

    app.get("/api/27-days-forecast", async (req: Request, res: Response) => {
        const apiData = api27Day();
        const [status, data] = await fetchDataFromApi(apiData);
        res.status(status).json(data);
    });

    app.get("/api/image-ovation", async (req: Request, res: Response, next: NextFunction) => {
        console.log("ovation");
        console.log(req.query);
        imageTransformationHandler(req, res, next);
    });
}

export default routes;
