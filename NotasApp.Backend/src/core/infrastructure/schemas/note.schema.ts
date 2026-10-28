import { EntitySchema } from "typeorm";
import { NoteModel } from "../models/note.model";

export const NoteSchema = new EntitySchema<NoteModel>({
    name: "Note",
    tableName: "notes",
    columns: {
        id: { type: String, primary: true, generated: "uuid" },
        title: { type: String },
        content: { type: String },
        createdAt: { type: Date, createDate: true },
        deletedAt: { type: Date, deleteDate: true, nullable: true },
    },
    relations: {
        user: {
            target: "User",
            nullable: false,
            inverseSide: "notes",
            type: "many-to-one",
            joinColumn: { name: "userId" },
        },
    },
});
