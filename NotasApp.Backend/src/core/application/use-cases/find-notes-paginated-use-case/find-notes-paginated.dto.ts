import { NoteDto } from "../store-note-use-case/store-note.dto";

export class FindNotesPaginatedRequestDto {
    page: number;
    userId: string;
    pageSize: number;
}

export class FindNotesPaginatedResponseDto {
    page: number;
    total: number;
    data: NoteDto[];
    pageSize: number;

    constructor(data: NoteDto[], total: number, page: number, pageSize: number) {
        this.data = data;
        this.page = page;
        this.total = total;
        this.pageSize = pageSize;
    }
}
