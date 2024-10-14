import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { UserRepository } from "../models/users";
import logger from "../lib/logger";

async function protectRoute (req: Request, res: Response, next: NextFunction): Promise<void>{
  try {
    if(!req.headers.authorization){
      logger.error("Authentication token unavailable")
      res.status(401).json({
        status: "error",
        errorType: 'AuthError',
        message: "Authorization token unavaible in header"
      });
      return
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token!, process.env.JWT_SECRET!);
    const user = await new UserRepository().FindOneById(decoded as string);
    if (!user) {
      logger.error("Authentication token invalid")
      res.status(401).json({
        status: "error",
        errorType: 'AuthError',
        message: "Authorization token invalid"
      });
      return
    }

    req.user_id = decoded.toString();

    next();

  } catch (err) {
    logger.error("Authorization token invalid")
    res.status(401).json({
      status: "error",
      errorType: 'AuthError',
      message: "Authorization token invalid"
    })
    return
  }
};

export default protectRoute;