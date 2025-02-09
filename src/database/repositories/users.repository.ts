import { eq } from "drizzle-orm";
import { db } from "../db.ts";
import { users, type InsertUser, type SelectUser } from "../schema/users.ts";

export const createUser = async(userData: InsertUser): Promise<SelectUser | Error>  => {
    try {
        const [newUser] = await db.insert(users).values(userData);
        if (newUser) {
            return newUser;
        }
        throw new Error("User not created");
    } catch(error) {
        return error as Error;
    }
}

export const getUserByNetId = async(netId: string): Promise<SelectUser | Error> => {
    try {   
        const [user] = await db.select().from(users).where(eq(
            users.netId, netId
        ))

        if (user) {
            return user;
        }

        throw new Error("User not found")
    } catch(error) {
        return error as Error;
    }
}

export const getUserByName = async(name: string): Promise<SelectUser | Error> => {  
    try {
        const [user] = await db.select().from(users).where(eq(
            users.name, name
        ))

        if (user) {
            return user;
        }

        throw new Error("User not found")
    } catch(error) {
        return error as Error;
    }
}