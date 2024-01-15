import "dotenv/config";
import express from "express";
//import env from "dotenv";
//import path from "path";
import fetchDataFromApi from "./utils/fetchDataFromApi";
import { apiPlanetaryKIndex, apiStormglassWeather } from "./apis/apiParams";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/PlanetaryKIndex", async (req, res) => {
    const data = await fetchDataFromApi(apiPlanetaryKIndex);
    res.json(data);
});

app.get("/api/stormglassWeather", async (req, res) => {
    const apiData = apiStormglassWeather("48.14816", "17.10674", "cloudCover"); // TODO data from body
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

export default app;
