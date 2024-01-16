import "dotenv/config";
import express from "express";
//import env from "dotenv";
//import path from "path";
import fetchDataFromApi from "./utils/fetchDataFromApi";
import { apiPlanetaryKIndex, apiSpaceWeather, apiYRMETWeather } from "./apis/apiParams";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/planetary-k-index", async (req, res) => {
    const apiData = apiPlanetaryKIndex(); // TODO data from body
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/sunstorm-events", async (req, res) => {
    const apiData = apiSpaceWeather(); // TODO data from body
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

app.get("/api/yr-met-weather", async (req, res) => {
    const apiData = apiYRMETWeather("48", "17"); // TODO data from body
    const data = await fetchDataFromApi(apiData);
    res.json(data);
});

export default app;
