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
const supertest_1 = __importDefault(require("supertest"));
const createApp_1 = __importDefault(require("../../createApp"));
jest.mock("../../utils/connectRedis", () => ({
    redisClient: {
        get: jest.fn(),
        json: {
            get: jest.fn(),
            set: jest.fn(),
        },
        sendCommand: jest.fn(),
    },
}));
describe("get kp index", () => {
    it("should return status 200 and body", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const app = (0, createApp_1.default)();
            const { redisClient } = require("../../utils/connectRedis");
            redisClient.sendCommand.mockResolvedValue("OK");
            redisClient.json.get.mockResolvedValue({ some: "data" });
            redisClient.json.set.mockResolvedValue("OK");
            const { status, body } = yield (0, supertest_1.default)(app).get("/api/planetary-k-index");
            expect(status).toBe(200);
            expect(body).toHaveLength;
        });
    });
});
