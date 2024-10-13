import { User } from "../dto/user"

export const isUser = (user: any): user is User => user.id && user.username && typeof(user.id) == 'string';