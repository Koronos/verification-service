import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import dotenv from "dotenv";
import expressValidator from "express-validator";

// Helper than catch async errors
import "express-async-errors";

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({path: ".env"});

// Modules


// Middlewares
import fakeAuthMiddleware from "./middlewares/fakeAuthMiddleware";
import verificationCodeRouting from "./routing/verificationCodeRouting";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Routes
 */
app.get("/", function (req, res) {
    res.send("Holi v:<");
});

app.use("/verificationCode", verificationCodeRouting);

export default app;