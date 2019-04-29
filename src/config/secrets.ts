import logger from "../services/loggerService";

export const ENVIRONMENT = process.env.NODE_ENV;

// Data base connection url
if (!process.env.DATABASE_URL) {
    logger.error("No client secret. Set DATABASE_URL environment variable.");
    process.exit(1);
}

export const DATABASE_URL = process.env.DATABASE_URL;