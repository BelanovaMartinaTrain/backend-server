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
const server_1 = require("../server");
const fetchDataFromApi = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const { apiUrl, apiKey, apiRedisKey, timestampRedisKey, cacheTTL } = params;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    // when there is no timestamp in redis it's set to 0
    const lastRequestTimestamp = Number(yield server_1.redisClient.get(`${timestampRedisKey}`)) || 0;
    let data;
    // if there is no timestamp (data were not fetched yet or ttl expired), fetch the data
    if (!lastRequestTimestamp) {
        console.log("fetching, setting timestamp and data to redis...", new Date().toLocaleTimeString([], { hourCycle: "h23", hour: "2-digit", minute: "2-digit" }));
        // TODO check API response or AJAX
        try {
            //if there is apiKey value fetch with api key
            if (!!apiKey) {
                const response = yield fetch(apiUrl, {
                    headers: {
                        "User-agent": validateEnv_1.default.USER_AGENT,
                        Authorization: apiKey,
                    },
                });
                data = yield response.json();
                console.log("key");
            }
            else {
                const response = yield fetch(apiUrl, {
                    headers: {
                        "User-agent": validateEnv_1.default.USER_AGENT,
                    },
                });
                data = yield response.json();
                console.log("no key");
            }
            // TODO check redis response setting data, when not OK throw error
            // if fetch was succesfull set current timestamp to redis with ttl
            // TODO edge case when API sends back JSON with error
            const replySetRedisTimestamp = yield server_1.redisClient.sendCommand(["SET", `${timestampRedisKey}`, `${currentTimestamp}`, "EX", `${cacheTTL}`]);
            console.log(replySetRedisTimestamp);
            // if fetch was succesfull set fetched data to redis
            const replySetRedisData = yield server_1.redisClient.json.set(apiRedisKey, "$", data);
            console.log(replySetRedisData);
            // if there is error fetching, try reading older data from redis, or set data to "Error" for future error handling
        }
        catch (_a) {
            data = (yield server_1.redisClient.json.get(apiRedisKey)) || "Error";
        }
        // else there is timestamp read data from redis
    }
    else {
        data = (yield server_1.redisClient.json.get(apiRedisKey)) || "Error";
        console.log("reading from redis...", new Date().toLocaleTimeString([], { hourCycle: "h23", hour: "2-digit", minute: "2-digit" }));
    }
    // TODO error handling
    // data return in each case
    return data;
});
exports.default = fetchDataFromApi;
