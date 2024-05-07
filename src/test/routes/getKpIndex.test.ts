import "dotenv/config";
import supertest from "supertest";
import createApp from "../../createApp";

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
    it("should return status 200 and body", async function () {
        const app = createApp();
        const { redisClient } = require("../../utils/connectRedis");

        redisClient.sendCommand.mockResolvedValue("OK");
        redisClient.json.get.mockResolvedValue({ some: "data" });
        redisClient.json.set.mockResolvedValue("OK");

        const { status, body } = await supertest(app).get("/api/planetary-k-index");

        expect(status).toBe(200);
        expect(body).toHaveLength;
    });
});
