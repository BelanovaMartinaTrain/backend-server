import axios from "axios";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { resolve } from "path";

export const fetchAndSaveOvationImage = async (name: string) => {
    const url = `https://services.swpc.noaa.gov/images/animations/ovation/${name}/latest.jpg`;
    if (!existsSync("public")) {
        mkdirSync("public");
    }

    console.log(name);

    try {
        const response = await axios({ url, method: "GET", responseType: "stream" });
        const imageFolderPath = resolve("public", `latest-${name}.jpg`);
        const writer = createWriteStream(imageFolderPath);

        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on("finish", resolve);
            writer.on("error", reject);
        });
    } catch (error) {
        console.error("Failed to fetch image north:", error);
    }
};
