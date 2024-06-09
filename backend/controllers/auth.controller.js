import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
    console.log("REQ");
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const user = await User.findOne({ username});

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        //hash the password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //https://avatar-placeholder.iran.liara.run/document
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic: 'gender' === 'male' ? boyProfilePic : girlProfilePic
        });

        if (newUser) {
            //generate JWT token here
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({ 
                _id: newUser._id,
                fullName: newUser.fullName,
                username: newUser.username,
                profilePic: newUser.profilePic,
            });
        } else {
           
            res.status(400).json({ error: "Invalid user data" });
        }

        

    } catch (error) {
        console.error("Error signing up", error.message);
        res.status(500).json({ message: "Something went wrong" });
    };
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("authcontoller", req.body, {username, password});

        const user = await User.findOne({username});
        console.log("user", user)
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        console.log("isPasswordCorrect", isPasswordCorrect);

        if (!user || !isPasswordCorrect) {
            return res.status(400).json({ error: "invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
        });
    } catch (error) {
        console.error("Error logging in controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });//clear the cookie
        res.status(200).send({message: "Logged out successfully"});
    } catch (error) {
        console.error("Error logging out controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
