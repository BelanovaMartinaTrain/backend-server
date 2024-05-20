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
const validateEnv_1 = __importDefault(require("../utils/validateEnv"));
const connectRedis_1 = require("../utils/connectRedis");
const defaultDataModifier_1 = __importDefault(require("../handlers/defaultDataModifier"));
const formatTimestamp24hFormat_1 = __importDefault(require("./formatTimestamp24hFormat"));
const fetchDataFromApi = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { apiUrl, apiKey, apiRedisKey, timestampRedisKey, cacheTTL, dataModifier = defaultDataModifier_1.default } = params;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const lastRequestTimestamp = Number(yield connectRedis_1.redisClient.get(`${timestampRedisKey}`)) || 0;
    let data;
    let status = 200;
    // if there is no lastRequestTimestamp (data were not fetched yet or ttl expired), fetch the data
    if (!lastRequestTimestamp) {
        console.log("fetching, setting timestamp and data to redis...", (0, formatTimestamp24hFormat_1.default)(new Date()));
        // TODO check API response or AXIOM
        try {
            //if there is apiKey value fetch with api key
            if (!!apiKey) {
                const response = yield fetch(apiUrl, {
                    headers: {
                        "User-agent": validateEnv_1.default.USER_AGENT,
                        Authorization: apiKey,
                    },
                });
                data = yield dataModifier(response);
                console.log("key");
                if (!response.ok) {
                    status = 500;
                    throw new Error("Public API is not available");
                }
            }
            else {
                const response = yield fetch(apiUrl, {
                    headers: {
                        "User-agent": validateEnv_1.default.USER_AGENT,
                    },
                });
                data = yield dataModifier(response);
                console.log("no key");
                if (!response.ok) {
                    status = 500;
                    throw new Error("Public API is not available");
                }
            }
            // TODO check redis response setting data, when not OK throw error
            // if fetch was succesfull set current timestamp to redis with ttl
            // TODO edge case when API sends back JSON with error
            const replySetRedisTimestamp = yield connectRedis_1.redisClient.sendCommand(["SET", `${timestampRedisKey}`, `${currentTimestamp}`, "EX", `${cacheTTL}`]);
            console.log(replySetRedisTimestamp);
            if (replySetRedisTimestamp != "OK") {
                status = 500;
                throw new Error("REDIS is not available");
            }
            // if fetch was succesfull set fetched data to redis
            const replySetRedisData = yield connectRedis_1.redisClient.json.set(apiRedisKey, "$", data);
            console.log(replySetRedisData);
            if (replySetRedisData != "OK") {
                status = 500;
                throw new Error("REDIS is not available");
            }
            connectRedis_1.redisClient.expire(apiRedisKey, 3600);
            // if there is error fetching, try reading older data from redis, or set data to "Error" for future error handling
        }
        catch (_a) {
            data = (yield connectRedis_1.redisClient.json.get(apiRedisKey)) || "";
            if (data === "")
                status = 500;
            else
                status = 200;
        }
        // else there is timestamp read data from redis
    }
    else {
        data = (yield connectRedis_1.redisClient.json.get(apiRedisKey)) || "";
        if (data === "")
            status = 500;
        else
            status = 200;
        console.log("reading from redis...", (0, formatTimestamp24hFormat_1.default)(new Date()));
    }
    // TODO error handling
    // data return in each case
    return [status, data];
});
exports.default = fetchDataFromApi;
