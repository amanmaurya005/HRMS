import { Router } from "express";
import {
  getEmployees,
  updateEmployee,
  deleteEmployee,
  addEmployee,
} from "../controller/employee.js";

const EmployeeRouter = Router();

EmployeeRouter.post("/add", addEmployee);
EmployeeRouter.get("/get", getEmployees);
EmployeeRouter.put("/edit/:id", updateEmployee);
EmployeeRouter.delete("/delete/:id", deleteEmployee);

export default EmployeeRouter;
