import * as express from "express";
import FakeUser from "../models/FakeUser";

/**
 *
 * Atuh service must inject the user in the request
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @param {e.NextFunction} next
 */
export default (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers["x-auth"]) {
        res.app.locals.user = new FakeUser("fake-uuid");
        return next();
    }

    res.status(401).send("Auth required");
};