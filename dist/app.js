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
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const createApp_1 = __importDefault(require("./createApp"));
const fetchAnOvationImage_1 = require("./scripts/fetchAnOvationImage");
const connectRedis_1 = require("./utils/connectRedis");
const app = (0, createApp_1.default)();
const port = validateEnv_1.default.PORT || 8080;
(0, fetchAnOvationImage_1.fetchAndSaveOvationImage)("north");
(0, fetchAnOvationImage_1.fetchAndSaveOvationImage)("south");
setInterval(() => (0, fetchAnOvationImage_1.fetchAndSaveOvationImage)("north"), 5 * 60 * 1000);
setInterval(() => (0, fetchAnOvationImage_1.fetchAndSaveOvationImage)("south"), 5 * 60 * 1000);
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Server running on port ${port}`);
    yield (0, connectRedis_1.connectRedis)();
}));
