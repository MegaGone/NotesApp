import { EntitySchema } from "typeorm";
import { UserModel } from "../models/user.model";

export const UserSchema = new EntitySchema<UserModel>({
    name: "User",
    tableName: "users",
    columns: {
        passwordHash: { type: String },
        email: { type: String, unique: true },
        username: { type: String, unique: true },
        isActive: { type: Boolean, default: true },
        id: { type: String, primary: true, generated: "uuid" },
    },
    relations: {
        notes: {
            target: "Note",
            type: "one-to-many",
            inverseSide: "user",
        },
    },
});
