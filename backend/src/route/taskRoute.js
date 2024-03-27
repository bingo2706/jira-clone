import express from "express";
import trainingSessionController from "../controller/taskController";

let router = express.Router();

router.post("/", trainingSessionController.create);
router.put("/update-position", trainingSessionController.updatePosition);

export default router;
