import { Router } from "express";
import * as MoodRouter from "./controller/mood.js";
import {auth} from "../middleware/auth.js"
const router = Router();

router.post("/add",auth,MoodRouter.AddMood);
router.get("/myHistory",auth,MoodRouter.GetMyHistory);
router.get("/last7Moods",auth,MoodRouter.getLast7Moods);
router.get("/checkMood",auth,MoodRouter.checkMood)

export default router;
