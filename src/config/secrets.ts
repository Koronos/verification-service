import logger from "../services/loggerService";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({path: ".env"});
}

export const ENVIRONMENT = process.env.NODE_ENV;

// Data base connection url
if (!process.env.DATABASE_URL) {
    logger.error("No client secret. Set DATABASE_URL environment variable.");
    process.exit(1);
}

export const DATABASE_URL = process.env.DATABASE_URL;