import "dotenv/config";
import express from "express";
//import env from "dotenv";
//import path from "path";
import fetchDataFromApi from "./utils/fetchDataFromApi";
import { apiPlanetaryKIndex, apiSpaceWeather, apiYRMETWeather, apiSolarWind, apiMagneticField, apiFlux } from "./apis/apiParams";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/planetary-k-index", async (req, res) => {
    const apiData = apiPlanetaryKIndex();
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

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

export default app;
