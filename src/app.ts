import "dotenv/config";
import express from "express";
//import env from "dotenv";
//import path from "path";
import fetchDataFromApi from "./utils/fetchDataFromApi";
import { apiPlanetaryKIndex } from "./apis/apiData";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/api/PlanetaryKIndex", async (req, res) => {
    // custom fetch function modified to only read data from redis unless the requested timelimit expired. in that case fetch data from API
    // it takes args of URL, API_KEY, cache key, TTL
    const data = await fetchDataFromApi(apiPlanetaryKIndex);

    res.json(data);
});

export default app;
