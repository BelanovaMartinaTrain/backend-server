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
const validateEnv_1 = __importDefault(require("./validateEnv"));
function fetchFromPublicAPI(apiUrl, apiKey) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const headers = apiKey !== ""
                ? {
                    headers: {
                        "User-agent": validateEnv_1.default.USER_AGENT,
                        Authorization: apiKey,
                    },
                }
                : {
                    headers: {
                        "User-agent": validateEnv_1.default.USER_AGENT,
                    },
                };
            const response = yield fetch(apiUrl, headers);
            if (!response.ok) {
                throw new Error("Couldn't fetch data");
            }
            return response;
        }
        catch (error) {
            console.error(error);
        }
    });
}
exports.default = fetchFromPublicAPI;
