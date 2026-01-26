import { Router } from "express";
import {
  addDepartment,
  getDepartments,
} from "../controller/department.js";

const DepartmentRouter = Router();

DepartmentRouter.post("/add", addDepartment);
DepartmentRouter.get("/get", getDepartments);

export default DepartmentRouter;
