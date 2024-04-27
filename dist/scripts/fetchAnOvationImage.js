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
exports.fetchAndSaveOvationImage = void 0;
const axios_1 = __importDefault(require("axios"));
const fs_1 = require("fs");
const path_1 = require("path");
const fetchAndSaveOvationImage = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `https://services.swpc.noaa.gov/images/animations/ovation/${name}/latest.jpg`;
    if (!(0, fs_1.existsSync)("public")) {
        (0, fs_1.mkdirSync)("public");
    }
    console.log(name);
    try {
        const response = yield (0, axios_1.default)({ url, method: "GET", responseType: "stream" });
        const imageFolderPath = (0, path_1.resolve)("public", `latest-${name}.jpg`);
        const writer = (0, fs_1.createWriteStream)(imageFolderPath);
        response.data.pipe(writer);
        return new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
    }
    catch (error) {
        console.error("Failed to fetch image north:", error);
    }
});
exports.fetchAndSaveOvationImage = fetchAndSaveOvationImage;
