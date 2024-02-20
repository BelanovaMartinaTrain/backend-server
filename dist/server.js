"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const redis_1 = require("redis");
const port = validateEnv_1.default.PORT;
const redisPassword = validateEnv_1.default.REDIS_PASSWORD;
exports.redisClient = (0, redis_1.createClient)({
    password: redisPassword,
    socket: {
        host: "redis-17111.c327.europe-west1-2.gce.cloud.redislabs.com",
        port: 17111,
    },
});
exports.redisClient.on("error", (err) => console.log("Redis Client Error", err));
exports.redisClient
    .connect()
    .then(() => {
    console.log("Redis connected");
    app_1.default.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
})
    .catch(console.error);
