import "dotenv/config";
import express from "express";
//import env from "dotenv";
//import path from "path";
import fetchDataFromApi from "./utils/fetchDataFromApi";

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res) => {
    // custom fetch function modified to only read data from redis unless the requested timelimit expired. in that case fetch data from API
    // it takes args of URL, API_KEY, cache key, TTL
    const data = await fetchDataFromApi("https://services.swpc.noaa.gov/json/planetary_k_index_1m.json", "planetary_k_index", "last_api_request_time", 3600);
    res.json(data);
});

export default app;
