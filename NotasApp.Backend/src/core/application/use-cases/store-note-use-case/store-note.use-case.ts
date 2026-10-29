import { Injectable } from "@nestjs/common";
import { StoreNoteRequestDto, NoteDto } from "./store-note.dto";
import { NoteEntity } from "src/core/domain/entities/note.entity";
import { INoteRepository } from "src/core/domain/repositories/note.repository";

@Injectable()
export class StoreNoteUseCase {
    constructor(private readonly _noteRepository: INoteRepository) { }

    public async execute({ userId, title, content }: StoreNoteRequestDto): Promise<NoteDto> {
        const note = new NoteEntity({ userId, title, content });

        const stored = await this._noteRepository.store(note);

        return new NoteDto(stored.id, stored.title, stored.content, stored.createdAt);
    }
}
