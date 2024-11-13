import express from "express";
import {register, login, islogedin, username,logout} from "../controllers/auth.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/isloged", auth, islogedin);
router.post("/logout", auth, logout);
router.get("/username/:user", username);

export default router;

