import { NoteEntity } from "../entities/note.entity";

export type PaginatedNotes = {
    total: number;
    data: NoteEntity[];
};

export abstract class INoteRepository {
    public abstract store(note: NoteEntity): Promise<NoteEntity>;
    public abstract softDelete(id: string, userId: string): Promise<boolean>;
    public abstract findByUserPaginated(userId: string, page: number, pageSize: number): Promise<PaginatedNotes>;
}
