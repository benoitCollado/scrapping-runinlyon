import express from "express";
import {upload, upload_meta_data} from "../controllers/upload.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/file/:id",auth ,upload);
router.post("/metadata", auth, upload_meta_data)

export default router;