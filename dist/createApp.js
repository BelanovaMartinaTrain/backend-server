"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const morgan = require("morgan");
function createApp() {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, cors_1.default)({
        origin: "https://auroraforecast.online/",
    }));
    app.use(express_1.default.json());
    app.use(express_1.default.static("public"));
    app.use(morgan("dev"));
    (0, routes_1.default)(app);
    return app;
}
exports.default = createApp;
