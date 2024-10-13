import jwt, { Secret } from "jsonwebtoken";
import dotenv from 'dotenv';
import { Response } from "express";

dotenv.config()

const generateTokenAndSetCookie = (userId: string, res: Response) => {
    const jwtSecret: Secret = process.env.JWT_SECRET!.toString()
    const token = jwt.sign({userId}, jwtSecret, {
        expiresIn: '15d'
    })

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, //prevent XSS attacks
        sameSite:"strict", //CSRFn attacks cross-site forgery attacks
    });
};

export default generateTokenAndSetCookie;