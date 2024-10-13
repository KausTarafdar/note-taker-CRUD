import { Request, Response, RequestHandler } from "express";
import logger from "../../../lib/logger";
import { UserRepository } from "../../../models/users";
import { UserService } from "../../../services/userService";
import { User } from "../../../dto/user";
import generateTokenAndSetCookie from "../../../lib/setCookie";

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

export default async function handleSignUp (req: Request, res: Response) {
    try {
        const { username, password } = req.body;

        if(!username || !password) {
            res.status(400).json({
                error: 'ApiError',
                message: 'Username or password not provided'
            })
        }

        else {
            const user: User | null = await userService.signUp(username, password);
            if(user == null) {
                res.status(409).json({
                    error: 'Service Error',
                    message: 'User already exists'
                })
            }
            else {
                generateTokenAndSetCookie(user.id, res);
                logger.info(`New User << id: ${user.id}, username: ${user.username}, created_at: ${new Date()} >>`)

                res.status(200).json({
                    id: user.id,
                    username: user.username,
                    created_at: new Date()
                })
            }
        }

    } catch (err) {
        logger.info(err)
        res.status(500).json({
            error: 'ApiError',
            message: 'Something went wrong'
        })
    }
}