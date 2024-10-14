import { Request, Response } from "express";
import { UserService } from "../../../services/userService";
import { UserRepository } from "../../../models/users";
import { User } from "../../../dto/user";
import jwt, { Secret } from 'jsonwebtoken'

const userRepository: UserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

export default async function handleLogin(req: Request, res: Response) {
    try {
        const {username, password} = req.body;

        if(!username || !password) {
            res.status(400).json({
                status: 'error',
                error: 'ApiError',
                message: 'Username or password not provided',
                data: {}
            })
        }

        else {
            const user: User | null = await userService.signIn(username, password);
            if(user == null){
                res.status(400).json({
                    status: 'error',
                    errorType: 'Request Error',
                    message: 'Username or password incorrect',
                    data: {}
                })
            }
            else {
                const jwtSecret: Secret = process.env.JWT_SECRET!.toString()
                const token = jwt.sign(user.id, jwtSecret)

                res.status(200).json({
                    status: 'success',
                    message: 'User successufully logged in',
                    data : {
                        id: user.id,
                        username: user.username,
                        created_at: new Date(),
                        jwt: token
                    }
                })
            }
        }
    } catch(err) {
        res.status(500).json({
            status: 'error',
            error: 'ApiError',
            message: 'Something went wrong',
            data: {}
        })
    }
}