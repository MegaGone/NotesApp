import { Injectable } from "@nestjs/common";
import { NoteDto } from "../store-note-use-case/store-note.dto";
import { INoteRepository } from "src/core/domain/repositories/note.repository";
import { FindNotesPaginatedRequestDto, FindNotesPaginatedResponseDto } from "./find-notes-paginated.dto";

@Injectable()
export class FindNotesPaginatedUseCase {
    constructor(private readonly _noteRepository: INoteRepository) { }

    public async execute({ userId, page, pageSize }: FindNotesPaginatedRequestDto): Promise<FindNotesPaginatedResponseDto> {
        const { data, total } = await this._noteRepository.findByUserPaginated(userId, page, pageSize);

        const items = data.map((note) => new NoteDto(note.id, note.title, note.content, note.createdAt));

        return new FindNotesPaginatedResponseDto(items, total, page, pageSize);
    }
}
