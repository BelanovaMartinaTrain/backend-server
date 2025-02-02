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
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const redisPassword = validateEnv_1.default.REDIS_PASSWORD;
exports.redisClient = (0, redis_1.createClient)({
    username: "default",
    password: redisPassword,
    socket: {
        host: "redis-14641.c270.us-east-1-3.ec2.redns.redis-cloud.com",
        port: 14641,
    },
});
exports.redisClient.on("error", (err) => console.log("Redis Client Error", err));
function connectRedis() {
    return __awaiter(this, void 0, void 0, function* () {
        exports.redisClient
            .connect()
            .then(() => {
            console.log("Redis connected");
        })
            .catch(console.error);
    });
}
exports.connectRedis = connectRedis;
