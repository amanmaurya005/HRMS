import express from "express";
import "dotenv/config"
import cors from "cors"
import authRouter from "./router/auth.js";
import cookieParser from "cookie-parser";
import connectToDB from "./db/connectToDB.js"
import DepartmentRouter from "./router/department.js";
import EmployeeRouter from "./router/employee.js";
import AttendanceRouter from "./router/attendance.js";


const app = express();
app.use(express.json());

connectToDB()

const frontend=process.env.VITE_BASEURL
app.use(
    cors({
        origin:frontend,
        credentials:true,
    })
);
app.use(cookieParser())


app.use("/user",authRouter);
app.use("/department",DepartmentRouter);
app.use("/employees",EmployeeRouter);
app.use("/attendance", AttendanceRouter);


app.listen(3000, console.log("server started at port 3000"))