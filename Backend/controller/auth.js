import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import User from "../model/auth.js";


export async function login(req, res) {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const doesPasswordMatch = await bcrypt.compare(data.password, user.password);
        if (!doesPasswordMatch) {
            return res.status(400).json({ message: "password not macth" });
        }

        const user_token = jwt.sign({
            id: user._id,
            username: user.username
        },
            process.env.JWT_SECRET,
            { expiresIn: "3h" }
        );

        res.cookie("user_token", user_token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 3600 * 1000,
        });
        return res.status(200).json({ message: "LoggedIn successfully" })
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



export async function register(req, res) {

    try {
        const data = req.body;
        console.log(data)
        const existEmail = await User.findOne({ email: data.email });
        if (existEmail) {
            return res.status(400).json({ message: "Email already exist" })
        }
        const existUser = await User.findOne({ username: data.username })
        if (existUser) {
            return res.status(400).json({ message: "Username already exist" })
        }
        const existNumber = await User.findOne({ phone: data.phone })
        if (existNumber) {
            return res.status(400).json({ message: "Phone already exist" })
        }

        const hashpassword = await bcrypt.hash(data.password, 10);
        data.password = hashpassword;

        const newUser = new User(data);

        await newUser.save();
        res.status(201).json({ message: "Register successfully", user: newUser })
    }
    catch (error) {
        return res.status(500).json({ message: "server error", error: error.message })
    }
};