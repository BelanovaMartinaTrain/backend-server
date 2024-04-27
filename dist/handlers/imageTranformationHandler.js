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
exports.imageTransformationHandler = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const stream_1 = require("stream");
// Promisify the pipeline to be able to use async/await
const pipelineAsync = (0, util_1.promisify)(stream_1.pipeline);
const imageTransformationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hemisphere = req.query.hemisphere || "north";
        const format = (req.query.format || "webp");
        const width = parseInt(req.query.width) || 300;
        const height = parseInt(req.query.height) || undefined;
        console.log("log", hemisphere, format, width, height);
        res.type(`image/${format}`);
        const readStream = fs_1.default.createReadStream(`public/latest-${hemisphere}.jpg`);
        const transformStream = (0, sharp_1.default)().resize(width, height).toFormat(format);
        readStream.pipe(transformStream).pipe(res);
    }
    catch (error) {
        console.error("Error processing image", error);
        res.status(500).send("Error processing image");
    }
});
exports.imageTransformationHandler = imageTransformationHandler;
