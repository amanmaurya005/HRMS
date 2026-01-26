import {Router} from "express"
import { login, register } from "../controller/auth.js";
import { checkToken } from "../middlewares/checkToken.js";

const authRouter = Router();

authRouter.get("/check", checkToken, (req, res) => {
  return res.status(200).json({
    message: "User authenticated",
    userId: req.userId
  });
});
authRouter.post("/register",register);
authRouter.post("/login",login);

export default authRouter