import { NoteEntity } from "../entities/note.entity";

export abstract class INoteRepository {
    public abstract delete(id: string): Promise<boolean>;
    public abstract store(note: NoteEntity): Promise<boolean>;
    public abstract findPaginated(page: number, pageSize: number, title?: string | undefined): Promise<boolean>;
}
