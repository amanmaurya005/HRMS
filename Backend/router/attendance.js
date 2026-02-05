import { Router } from "express";
import {
  markAttendance,
  getAttendanceHistory,
} from "../controller/attendance.js";

const router = Router();

router.post("/mark", markAttendance);
router.get("/history", getAttendanceHistory);

export default router;
