import { Request, Response } from "express";
import { UserService } from "../../../services/userService";
import { UserRepository } from "../../../models/users";
import { User } from "../../../dto/user";
import generateTokenAndSetCookie from "../../../lib/setCookie";

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

export default async function handleLogin(req: Request, res: Response) {
    try {
        const {username, password} = req.body;

        if(!username || !password) {
            res.status(400).json({
                error: 'ApiError',
                message: 'Username or password not provided'
            })
        }

        else {
            const user: User | null = await userService.signIn(username, password);
            if(user == null){
                res.status(400).json({
                    error: 'Request Error',
                    message: 'Username or password incorrect'
                })
            }
            else {
                generateTokenAndSetCookie(user.id, res)
                res.status(200).json({
                    id: user.id,
                    username: user.username,
                    created_at: new Date()
                })
            }
        }
    } catch(err) {
        res.status(500).json({
            error: 'ApiError',
            message: 'Something went wrong'
        })
    }
}