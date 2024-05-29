import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        //check if token exists
        const token = req.cookies.jwt;//not able to get cookie, need to install cookie-parser
        if (!token) {
            return res.status(401).json({ error: "Unauthoraized-No Token Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized-Token Invalid" });
        }
        //decoded.userId is the payload of the token, which is the user id of the user who is logged in.select all the fields except password field from the user model to get the user data of the logged in user 
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = user; //add the user to the request object to be used in the next middleware or controller function 
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default protectRoute;