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
const fetchDataFromApi_1 = __importDefault(require("./utils/fetchDataFromApi"));
const modifyKIndex_1 = __importDefault(require("./handlers/modifyKIndex"));
const apiParams_1 = require("./apis/apiParams");
const imageTranformationHandler_1 = require("./handlers/imageTranformationHandler");
const planetaryKIndexController_1 = __importDefault(require("./controllers/planetaryKIndexController"));
function routes(app) {
    app.get("/api/planetary-k-index", planetaryKIndexController_1.default);
    app.get("/api/planetary-k-index-mod", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const apiData = (0, apiParams_1.apiPlanetaryKIndex)();
        const data = yield (0, modifyKIndex_1.default)(apiData);
        res.status(200).json(data);
    }));
    app.get("/api/sunstorm-events", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const apiData = (0, apiParams_1.apiSpaceWeather)();
        const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
        res.status(status).json(data);
    }));
    app.get("/api/solar-wind-density-5min", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const apiData = (0, apiParams_1.apiSolarWindDensity5Min)();
        const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
        res.status(status).json(data);
    }));
    app.get("/api/solar-wind-density-3day", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const apiData = (0, apiParams_1.apiSolarWindDensity3Day)();
        const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
        res.status(status).json(data);
    }));
    app.get("/api/solar-wind", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const apiData = (0, apiParams_1.apiSolarWind)();
        const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
        res.status(status).json(data);
    }));
    app.get("/api/magnetic-field", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const apiData = (0, apiParams_1.apiMagneticField)();
        const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
        res.status(status).json(data);
    }));
    app.get("/api/flux", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const apiData = (0, apiParams_1.apiFlux)();
        const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
        res.status(status).json(data);
    }));
    app.get("/api/yr-met-weather-10hours", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const lat = isNaN(Number(req.query.lat)) ? null : String(req.query.lat);
        const lon = isNaN(Number(req.query.lon)) ? null : String(req.query.lon);
        if (!lat || !lon) {
            res.status(500).send("Longitute and latitude are required");
        }
        else {
            const apiData = (0, apiParams_1.apiYRMETWeather10Hours)(lat, lon);
            const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
            res.status(status).json(data);
        }
    }));
    app.get("/api/yr-met-weather-complete", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const lat = isNaN(Number(req.query.lat)) ? null : String(req.query.lat);
        const lon = isNaN(Number(req.query.lon)) ? null : String(req.query.lon);
        if (!lat || !lon) {
            res.status(500).send("Longitute and latitude are required");
        }
        else {
            const apiData = (0, apiParams_1.apiYRMETWeatherComplete)(lat, lon);
            const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
            res.status(status).json(data);
        }
    }));
    app.get("/api/planetary-k-3h", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const apiData = (0, apiParams_1.apiPlanetaryK3h)();
        const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
        res.status(status).json(data);
    }));
    app.get("/api/27-days-forecast", (req, res) => __awaiter(this, void 0, void 0, function* () {
        const apiData = (0, apiParams_1.api27Day)();
        const [status, data] = yield (0, fetchDataFromApi_1.default)(apiData);
        res.status(status).json(data);
    }));
    app.get("/api/image-ovation", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
        console.log("ovation");
        console.log(req.query);
        (0, imageTranformationHandler_1.imageTransformationHandler)(req, res, next);
    }));
}
exports.default = routes;
