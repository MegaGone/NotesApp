import { UserModel } from "./user.model";

export interface NoteModel {
    id?: string;
    title: string;
    content: string;
    userId?: string;
    user?: UserModel;
    createdAt?: Date;
    deletedAt?: Date | null;
}
