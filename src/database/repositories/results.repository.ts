import { eq, or } from "drizzle-orm";
import { db } from "../db.ts";
import { results, type SelectResult } from "../schema/results.ts";
import { users } from "../schema/users.ts";

type GetResult = {
    id: number;
    user1: string;
    user2: string;
    status: string;
    name: string;
}

export const getResults = async (netId: string): Promise<Array<GetResult> | Error> => {
    try {
        const userResults = await db
        .select({
            id: results.id,
            user1: results.user1,
            user2: results.user2,
            status: results.status,
            name: users.name
        })
        .from(results)
        .leftJoin(users, or(
            eq(results.user1, users.netId),
            eq(results.user2, users.netId)
        ))
        .where(or(
            eq(results.user1, netId),
            eq(results.user2, netId)
        ))

        if (userResults.length == 0) {
            throw new Error("No results found");
        }

        return userResults as Array<GetResult>;
        
    } catch (error) {
        return error as Error;
    }
}

export const addResult = async (user1: string, user2: string): Promise<SelectResult | Error> => {
    try {
        const [result] = await db.insert(results).values({
            user1,
            user2
        });

        if (result) {
            return result;
        }

        throw new Error("Result not created");

    } catch (error) {
        return error as Error;
    }
}