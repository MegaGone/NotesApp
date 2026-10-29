export class StoreNoteRequestDto {
    userId: string;
    title: string;
    content: string;
}

export class NoteDto {
    id: string;
    title: string;
    content: string;
    createdAt: Date;

    constructor(id: string, title: string, content: string, createdAt: Date) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}
