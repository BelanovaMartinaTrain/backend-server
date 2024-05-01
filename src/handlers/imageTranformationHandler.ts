import sharp from "sharp";
import fs from "fs";
import { RequestHandler } from "express";

type ImageFormat = keyof sharp.FormatEnum;

export const imageTransformationHandler: RequestHandler = async (req, res) => {
    try {
        const hemisphere = (req.query.hemisphere as string) || "north";
        const format = (checkFormat(req.query.format as string) ? (req.query.format as string) : "webp") as ImageFormat;
        const width = parseInt(req.query.width as string) || 300;
        const height = parseInt(req.query.height as string) || null;

        res.type(`image/${format}`);

        const readStream = fs.createReadStream(`public/latest-${hemisphere}.jpg`);
        const transformStream = sharp().resize(width, height).toFormat(format);

        readStream.pipe(transformStream).pipe(res);
    } catch (error) {
        console.error("Error processing image", error);
        res.status(500).send("Error processing image");
    }
};

function checkFormat(format: string) {
    const allowedFormats = ["heic", "heif", "avif", "jpeg", "jpg", "jpe", "tile", "dz", "png", "raw", "tiff", "tif", "webp", "gif", "jp2", "jpx", "j2k", "j2c", "jxl"];
    if (allowedFormats.includes(format)) {
        return format;
    } else {
        return null;
    }
}
