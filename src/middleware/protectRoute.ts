import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserRepository } from "../models/users";

async function protectRoute (req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(400).json(
            { error: "Unauthorised - No token provided" }
        );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded) {
      res.status(401).json({ error: "Unauthorised - Invalid Token" });
    }

    const user = await new UserRepository().FindOneById(`${decoded}`);

    if (!user) {
      res.status(404).json({ error: "User not found" });
    }

    req.user_id = decoded.toString();

    next();

  } catch (error) {
    res.status(500).json({
        error: "AuthError",
        Message: 'Authentication token invalid'
    });
  }
};

export default protectRoute;