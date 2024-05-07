import { apiPlanetaryKIndex } from "../apis/apiParams";
import fetchDataFromApi from "../utils/fetchDataFromApi";
import { Request, Response } from "express";

export default async function planetaryKIndexController(req: Request, res: Response) {
    const apiData = apiPlanetaryKIndex();

    const [status, data] = await fetchDataFromApi(apiData);

    res.status(status).json(data);
}
