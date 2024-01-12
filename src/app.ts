import "dotenv/config";
import express from "express";
//import env from "dotenv";
//import path from "path";
import redisClient from "./setupDatabase";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get("/", async (req, res) => {
  const response = await fetch(
    "https://services.swpc.noaa.gov/json/planetary_k_index_1m.json"
  );
  const data = await response.json();
  res.json(data);
});

export default app;
