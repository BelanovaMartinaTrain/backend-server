import "dotenv/config";
import express from "express";
//import env from "dotenv";
//import path from "path";
import fetchDataFromApi from "./utils/fetchDataFromApi";
import fetchAndModify from "./utils/modifyData";
import { apiPlanetaryKIndex, apiSpaceWeather, apiYRMETWeather, apiSolarWind, apiMagneticField, apiFlux, apiPlanetaryK3h } from "./apis/apiParams";
import cors from "cors";

const app = express();

app.use(
    cors({
        origin: "https://aurora-forecast-frontend.vercel.app/",
    })
);

app.use(express.json());
app.use(express.static("public"));

app.get("/api/planetary-k-index", async (req, res) => {
    const apiData = apiPlanetaryKIndex();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});
//TEST
app.get("/api/planetary-k-index-mod", async (req, res) => {
    const apiData = apiPlanetaryKIndex();
    const data = await fetchAndModify(apiData);
    res.json(data);
});
//END TEST
app.get("/api/sunstorm-events", async (req, res) => {
    const apiData = apiSpaceWeather();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

// TODO combine wind, field, flux and latest pic to one and send back as object
app.get("/api/solar-wind", async (req, res) => {
    const apiData = apiSolarWind();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/magnetic-field", async (req, res) => {
    const apiData = apiMagneticField();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/flux", async (req, res) => {
    const apiData = apiFlux();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/yr-met-weather", async (req, res) => {
    const apiData = apiYRMETWeather("48", "17"); // TODO data from body
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/planetary-k-3h", async (req, res) => {
    const apiData = apiPlanetaryK3h();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

export default app;
