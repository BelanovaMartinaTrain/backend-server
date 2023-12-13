import "dotenv/config";
import express from "express";
import env from "env";

const PORT = process.env.PORT || 5050;

const app = express();

app.use(express.json());

export default app;
