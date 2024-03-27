import express from "express";
import taskRoute from "./taskRoute";
import statusRoute from "./statusRoute";
let router = express.Router();

let initwebRoutes = (app) => {
    router.get("/", (req, res) => {
        return res.send("Hello");
    });
    app.use("/api/task", taskRoute);
    app.use("/api/status", statusRoute);
    return app.use("/", router);
};
module.exports = initwebRoutes;
