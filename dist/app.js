"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const fetchDataFromApi_1 = __importDefault(require("./utils/fetchDataFromApi"));
const modifyKIndex_1 = __importDefault(require("./utils/modifyKIndex"));
const apiParams_1 = require("./apis/apiParams");
const cors_1 = __importDefault(require("cors"));
const fetchAnOvationImage_1 = require("./scripts/fetchAnOvationImage");
const imageTranformationHandler_1 = require("./handlers/imageTranformationHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// app.use(
//     cors({
//         origin: "https://auroraforecast.online/",
//     })
// );
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
(0, fetchAnOvationImage_1.fetchAndSaveOvationImage)("north");
(0, fetchAnOvationImage_1.fetchAndSaveOvationImage)("south");
setInterval(() => (0, fetchAnOvationImage_1.fetchAndSaveOvationImage)("north"), 5 * 60 * 1000);
setInterval(() => (0, fetchAnOvationImage_1.fetchAndSaveOvationImage)("south"), 5 * 60 * 1000);
app.get("/api/planetary-k-index", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiPlanetaryKIndex)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/planetary-k-index-mod", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiPlanetaryKIndex)();
    const data = yield (0, modifyKIndex_1.default)(apiData);
    res.json(data);
}));
app.get("/api/sunstorm-events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiSpaceWeather)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    console.log("sunstorm events");
    res.json(data);
}));
// TODO combine wind, field, flux and latest pic to one and send back as object
app.get("/api/solar-wind-density-5min", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiSolarWindDensity5Min)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/solar-wind-density-3day", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiSolarWindDensity3Day)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/solar-wind", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiSolarWind)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/magnetic-field", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiMagneticField)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/flux", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiFlux)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/yr-met-weather-10hours", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lat = String(req.query.lat);
    const lon = String(req.query.lon);
    const apiData = (0, apiParams_1.apiYRMETWeather10Hours)(lat, lon);
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/yr-met-weather-complete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lat = String(req.query.lat);
    const lon = String(req.query.lon);
    const apiData = (0, apiParams_1.apiYRMETWeatherComplete)(lat, lon);
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/planetary-k-3h", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiPlanetaryK3h)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/27-days-forecast", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.api27Day)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/image-ovation", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ovation");
    console.log(req.query);
    (0, imageTranformationHandler_1.imageTransformationHandler)(req, res, next);
}));
exports.default = app;
