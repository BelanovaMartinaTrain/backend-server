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
//import env from "dotenv";
//import path from "path";
const fetchDataFromApi_1 = __importDefault(require("./utils/fetchDataFromApi"));
const modifyData_1 = __importDefault(require("./utils/modifyData"));
const apiParams_1 = require("./apis/apiParams");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.get("/api/planetary-k-index", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiPlanetaryKIndex)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
//TEST
app.get("/api/planetary-k-index-mod", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiPlanetaryKIndex)();
    const data = yield (0, modifyData_1.default)(apiData);
    res.json(data);
}));
//END TEST
app.get("/api/sunstorm-events", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiSpaceWeather)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
// TODO combine wind, field, flux and latest pic to one and send back as object
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
app.get("/api/yr-met-weather", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiYRMETWeather)("48", "17"); // TODO data from body
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
app.get("/api/planetary-k-3h", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiData = (0, apiParams_1.apiPlanetaryK3h)();
    const data = yield (0, fetchDataFromApi_1.default)(apiData);
    res.json(data);
}));
exports.default = app;
