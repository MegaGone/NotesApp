import { Injectable } from "@nestjs/common";
import { NoteExceptionCode } from "src/core/domain/enums/exception.enum";
import { INoteRepository } from "src/core/domain/repositories/note.repository";
import { NoteNotFoundException } from "src/core/domain/exceptions/note-not-found.exception";

@Injectable()
export class DeleteNoteUseCase {
    constructor(private readonly _noteRepository: INoteRepository) { }

    public async execute(id: string, userId: string): Promise<void> {
        const deleted = await this._noteRepository.softDelete(id, userId);

        if (!deleted)
            throw new NoteNotFoundException(NoteExceptionCode.NOTE_NOT_FOUND, "Note not found.");
    }
}
