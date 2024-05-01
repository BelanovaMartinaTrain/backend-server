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
const imageTransformationHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hemisphere = req.query.hemisphere || "north";
        const format = (checkFormat(req.query.format) ? req.query.format : "webp");
        console.log(format);
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
function checkFormat(format) {
    const allowedFormats = ["heic", "heif", "avif", "jpeg", "jpg", "jpe", "tile", "dz", "png", "raw", "tiff", "tif", "webp", "gif", "jp2", "jpx", "j2k", "j2c", "jxl"];
    if (allowedFormats.includes(format)) {
        console.log(true);
        return format;
    }
    else {
        console.log(false);
        return undefined;
    }
}
