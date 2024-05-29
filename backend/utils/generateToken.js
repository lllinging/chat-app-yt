import jwt from 'jsonwebtoken';

//userId is the payload of the token 
//SECRET is the secret key to sign the token and is the signature of the token to be used to verify the token
const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,//MS: 15 days in milliseconds
        httpOnly: true, // cookie cannot be accessed by client side JS to prevent XSS attacks cross site scripting  
        sameSite: 'strict', //CSRF attacks cross site request forgery 
        secure: process.env.NODE_ENV !== 'development'
    });
};

export default generateTokenAndSetCookie;
