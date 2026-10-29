import { NoteModel } from "../models/note.model";
import { NoteEntity } from "../../domain/entities/note.entity";

export class NoteMapper {
    public static toDomain(model: NoteModel): NoteEntity {
        return new NoteEntity({
            id: model.id,
            title: model.title,
            content: model.content,
            userId: model.userId ?? model.user?.id,
            createdAt: model.createdAt,
            deletedAt: model.deletedAt,
        });
    }

    public static toPersistence(entity: NoteEntity): NoteModel {
        return {
            id: entity.id,
            title: entity.title,
            content: entity.content,
            userId: entity.userId,
        };
    }
}
