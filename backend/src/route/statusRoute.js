import express from "express";
import statusController from "../controller/statusController";
let router = express.Router();

router.post("/", statusController.create);
router.get("/", statusController.getAll);

export default router;
