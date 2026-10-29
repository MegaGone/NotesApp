import { Injectable } from "@nestjs/common";
import { NoteModel } from "../models/note.model";
import { DeepPartial, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { NoteSchema } from "../schemas/note.schema";
import { NoteMapper } from "../mappers/note.mapper";
import { NoteEntity } from "../../domain/entities/note.entity";
import { INoteRepository, PaginatedNotes } from "../../domain/repositories/note.repository";

@Injectable()
export class NoteRepository implements INoteRepository {
    constructor(
        @InjectRepository(NoteSchema)
        private readonly _repository: Repository<NoteModel>,
    ) { }

    public async store(note: NoteEntity): Promise<NoteEntity> {
        const saved = await this._repository.save({
            title: note.title,
            content: note.content,
            user: { id: note.userId },
        } as DeepPartial<NoteModel>);

        return NoteMapper.toDomain(saved as NoteModel);
    }

    public async findByUserPaginated(userId: string, page: number, pageSize: number): Promise<PaginatedNotes> {
        const [rows, total] = await this._repository
            .createQueryBuilder("note")
            .where("note.userId = :userId", { userId })
            .orderBy("note.createdAt", "DESC")
            .skip((page - 1) * pageSize)
            .take(pageSize)
            .getManyAndCount();

        return { data: rows.map((row) => NoteMapper.toDomain(row as NoteModel)), total };
    }

    public async softDelete(id: string, userId: string): Promise<boolean> {
        const result = await this._repository
            .createQueryBuilder()
            .softDelete()
            .where("id = :id", { id })
            .andWhere("userId = :userId", { userId })
            .execute();

        return (result.affected ?? 0) > 0;
    }
}
