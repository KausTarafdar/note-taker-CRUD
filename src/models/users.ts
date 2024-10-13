import { DB } from "../db/connect";
import { User } from "../dto/user"
import { isUser } from "../lib/isUser";
import logger from "../lib/logger";

export class UserRepository {
    public async FindOneUser(username: string): Promise<User | null> {
        try {
            const result = await DB.prepare(`SELECT * FROM user
                                            WHERE username == '${username}'`).get();
            if(isUser(result)) {
                const user: User = {
                    id: result.id,
                    username: result.username
                }

                return user
            }

            return null
        } catch(err) {
            return null
        }
    }

    public async InsertUser(id: string, username: string, password: string){
        try {
            const insertQuery = DB.prepare(`INSERT INTO user(id, username, password)
                                            !VALUES('${id}', '${username}', '${password}')`);
            const transaction = DB.transaction(() => {
                const info = insertQuery.run()
                logger.info(info.changes)
            })
            transaction()
        } catch (err) {
            return null
        }
    }

    public async FindOneById(userId: string): Promise<Boolean>{
        try {
            const result = await DB.prepare(`SELECT id FROM user
                                            WHERE user_id='${userId}'`).get();
            if(isUser(result)) {
                return true
            }
            return false
        } catch(err) {
            return false
        }
    }
}