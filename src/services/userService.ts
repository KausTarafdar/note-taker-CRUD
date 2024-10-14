import { randomUUID } from "crypto";
import { User } from "../dto/user";
import { UserRepository } from "../models/users";
import { compare, genSalt, hash } from "bcryptjs";
import logger from "../lib/logger";

export class UserService {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    public async signUp(username: string, password: string): Promise<User | null> {
        const checkUser: User | null = await this.userRepository.FindOneUser(username);
        if(checkUser !== null) {
            return null
        }

        const id: string = randomUUID();
        const salt = await genSalt(10);
        const hashedPassword: string = await hash(password, salt);

        try{
            await this.userRepository.InsertUser(id, username, hashedPassword);
            const newUser: User = {
                id: id,
                username: username
            }

            return newUser;
        } catch(err) {
            logger.error(err)
            return null
        }
    }

    public async signIn(username: string, password: string): Promise<User | null> {

        try {
            const checkUser: User | null = await this.userRepository.FindOneUser(username);
            if(checkUser !== null){
                const isPasswordCorrect = await compare(password, checkUser.password!)
                if(!isPasswordCorrect) {
                    return null
                }
            }
            return checkUser;
        } catch (err) {
            logger.error(err)
            return null
        }
    }
}