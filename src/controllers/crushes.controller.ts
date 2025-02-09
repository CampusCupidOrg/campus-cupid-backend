import { addCrush, getCrushesByNetId, updateCrushPositions } from "@/database/repositories/userCrushes.repository.ts";
import { searchUser } from "@/database/repositories/users.repository.ts";
import type { Context } from "hono";

export const searchCrush = async(crushName: string) => {
    const crushes = await searchUser(crushName);

    if (crushes instanceof Error) {
        return {
            status: 500,
            message: "Internal server error",
            prettyMessage: "An error occurred while searching for the user"
        }
    }

    if (crushes.length === 0) {
        return {
            status: 404,
            message: "Not Found",
            prettyMessage: "No users found"
        }
    }

    return {
        status: 200,
        message: "Users found",
        prettyMessage: "Users found successfully",
        data: {
            crushes
        }
    }
}

export const createCrush = async (c: Context) => {
    const email = c.get("email");
    const body = await c.req.json();

    const netId = email.split("@")[0];
    const crushId = body.crushId;
    const position = body.position;

    const result = await addCrush(netId, position, crushId);

    if (result instanceof Error) {
        return c.json({
            status: 500,
            message: "Internal server error",
            prettyMessage: "An error occurred while creating crush"
        }, 500);
    }

    return c.json({
        status: 201,
        message: "Crush created",
        prettyMessage: "Crush created successfully"
    }, 201);
}

export const fetchUserCrushes = async(c: Context) => {
    const email = c.get("email");
    
    const netId = email.split("@")[0];
    const crushes = await getCrushesByNetId(netId);

    if (crushes instanceof Error) {
        return c.json({
            status: 500,
            message: "Internal server error",
            prettyMessage: "An error occurred while fetching crushes"
        }, 500);
    }

    if (crushes.length === 0) {
        return c.json({
            status: 404,
            message: "Not Found",
            prettyMessage: "No crushes found"
        }, 404);
    }

    return c.json({
        status: 200,
        message: "Crushes fetched",
        prettyMessage: "Crushes fetched successfully",
        data: {
            crushes
        }
    }, 200);
}

type UpdateCrushBody = {
    position: number;
    crushId: string;
}

export const updateOrderOfCrushes = async(c: Context) => {
    const netId = c.get("email").split("@")[0];
    const body = await c.req.json()

    if (!body.updateData) {
        return c.json({
            status: 400,
            message: "Bad Request",
            prettyMessage: "Invalid request"
        }, 400);
    }

    const updateData = body.updateData as Array<UpdateCrushBody>;
    const result = await updateCrushPositions(netId, updateData);

    if (result instanceof Error) {
        return c.json({
            status: 500,
            message: "Internal server error",
            prettyMessage: "An error occurred while updating crushes"
        }, 500);
    }

    return c.json({
        status: 200,
        message: "Crushes updated",
        prettyMessage: "Crushes updated successfully"
    }, 200);
}