import { and, eq } from "drizzle-orm";
import { db } from "../db.ts";
import { userCrushes } from "../schema/userCrushes.ts";
import { users } from "../schema/users.ts";
import { inviteToApp } from "@/services/mailer.service.ts";

type CrushDetails = {
    name: string;
    position: number;
    crushId: string;
}

type UpdateCrushOrder = {
    position: number;
    crushId: string;
}

export const getCrushesByNetId = async(netId: string): Promise<Array<CrushDetails> | Error> => {
    try {
        const crushes = await db.select({
            name: users.name,
            position: userCrushes.position,
            crushId: userCrushes.crushId,
        })
        .from(userCrushes)
        .leftJoin(users, eq(userCrushes.crushId, users.netId))
        .orderBy(userCrushes.position)
        .where(eq(userCrushes.netId, netId));
        
        if (crushes.length === 0) {
            throw new Error("No crushes found");
        }

        return crushes as Array<CrushDetails>;

    } catch(error) {
        return error as Error;
    }
}

export const addCrush = async(netId: string, position: number, crushId: string): Promise<boolean | Error> => {
    try {

        await db.transaction(async (tx) => {
            const crushExists = await tx.select().from(users).where(eq(users.netId, crushId));
            if (crushExists.length === 0) {
                inviteToApp(String(`${crushId}@srmist.edu.in`));
            }

            const checkMaxCrushes = await tx.select().from(userCrushes).where(eq(userCrushes.netId, netId));
            if (checkMaxCrushes.length >= 5) {
                throw new Error("Max crushes reached");
            }

            const crush = await tx.select().from(userCrushes).where(
                and(
                    eq(userCrushes.netId, netId),
                    eq(userCrushes.crushId, crushId)
                )
            );

            if (crush.length > 0) {
                throw new Error("Crush already exists");
            }

            await tx.insert(userCrushes).values({
                netId,
                position,
                crushId
            });
        })

        return true;
    } catch(error) {
        return error as Error;
    }
}

export const deleteCrush = async(netId: string, crushId: string): Promise<boolean | Error> => {
    try {
        await db.delete(userCrushes).where(
            and(
                eq(userCrushes.netId, netId), 
                eq(userCrushes.crushId, crushId)
            )
        );

        return true;

    } catch(error) {
        return error as Error;
    }
}

export const updateCrushPositions = async(netId: string, crushes: Array<UpdateCrushOrder>): Promise<boolean | Error> => {
    try {
        await db.transaction(async (tx) => {
            for (const crush of crushes) {
                await tx.update(userCrushes)
                    .set({ position: crush.position })
                    .where(
                        and(
                            eq(userCrushes.netId, netId),
                            eq(userCrushes.crushId, crush.crushId)
                        )
                    );
            }
        })

        return true;

    } catch(error) {
        return error as Error;
    }
}