import { NoteModel } from "./note.model";

export interface UserModel {
    id?: string;
    email: string;
    username: string;
    isActive: boolean;
    notes?: NoteModel[];
    passwordHash: string;
}
