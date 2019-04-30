import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";

// Helper than catch async errors
import "express-async-errors";

// Middlewares
import verificationCodeRouting from "./routing/verificationCodeRouting";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));

/**
 * Routes
 */
app.get("/", function (req, res) {
    res.send("Verification Service up");
});
app.use("/verification-code", verificationCodeRouting);

export default app;