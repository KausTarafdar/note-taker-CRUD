import { Request, Response, RequestHandler } from "express";
import logger from "../../../lib/logger";
import { UserRepository } from "../../../models/users";
import { UserService } from "../../../services/userService";
import { User } from "../../../dto/user";
import jwt, { Secret } from "jsonwebtoken";

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

export default async function handleSignUp (req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            res.status(400).json({
                status: 'error',
                error: 'ApiError',
                message: 'Username or password not provided',
                data: {}
            })
        }

        else {
            const user: User | null = await userService.signUp(username, password);
            if(user == null) {
                res.status(409).json({
                    status: 'error',
                    error: 'Service Error',
                    message: 'User already exists',
                    data: {}
                })
            }
            else {
                logger.info(`New User << id: ${user.id}, username: ${user.username}, created_at: ${new Date()} >>`)
                const jwtSecret: Secret = process.env.JWT_SECRET!.toString()
                const token = jwt.sign(user.id, jwtSecret)

                res.status(200).json({
                    status: 'success',
                    message: "User is signed up",
                    data: {
                        id: user.id,
                        username: user.username,
                        created_at: new Date(),
                        jwt: token
                    }
                })
            }
        }

    } catch (err) {
        logger.error(err)
        res.status(500).json({
            status: 'success',
            error: 'ApiError',
            message: 'Something went wrong',
            data: {}
        })
    }
}