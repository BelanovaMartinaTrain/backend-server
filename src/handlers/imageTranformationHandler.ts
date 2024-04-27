import sharp from "sharp";
import fs from "fs";
import { promisify } from "util";
import { pipeline } from "stream";
import { RequestHandler } from "express";

// Promisify the pipeline to be able to use async/await
const pipelineAsync = promisify(pipeline);
type ImageFormat = keyof sharp.FormatEnum;

export const imageTransformationHandler: RequestHandler = async (req, res) => {
    try {
        const hemisphere = (req.query.hemisphere as string) || "north";
        const format = ((req.query.format as string) || "webp") as ImageFormat;
        const width = parseInt(req.query.width as string) || 300;
        const height = parseInt(req.query.height as string) || undefined;
        console.log("log", hemisphere, format, width, height);
        res.type(`image/${format}`);

        const readStream = fs.createReadStream(`public/latest-${hemisphere}.jpg`);
        const transformStream = sharp().resize(width, height).toFormat(format);

        readStream.pipe(transformStream).pipe(res);
    } catch (error) {
        console.error("Error processing image", error);
        res.status(500).send("Error processing image");
    }
};
