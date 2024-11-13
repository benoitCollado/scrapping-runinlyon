import express from "express";
import {list_files, download} from "../controllers/download.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.get("/list_files", auth, list_files);
router.get("/:id", auth, download);

export default router;

