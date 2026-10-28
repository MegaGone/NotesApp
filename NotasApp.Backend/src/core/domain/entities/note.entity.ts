export type FieldsOfNoteEntity = {
    readonly title: string;
    readonly userId: string;
    readonly content: string;
    readonly id?: string | null;
    readonly createdAt?: Date | null;
    readonly deletedAt?: Date | null;
}

export class NoteEntity {
    private _id: string;
    private _title: string;
    private _userId: string;
    private _content: string;
    private _createdAt: Date;
    private _deletedAt: Date | null;

    constructor(readonly _props: FieldsOfNoteEntity) {
        this._id = _props.id;
        this._title = _props.title;
        this._content = _props.content;
        this._userId = _props.userId;
        this._createdAt = _props.createdAt;
        this._deletedAt = _props.deletedAt ?? null;
    }

    public get id(): string {
        return this._id;
    }

    public get title(): string {
        return this._title;
    }

    public get content(): string {
        return this._content;
    }

    public get userId(): string {
        return this._userId;
    }

    public get createdAt(): Date {
        return this._createdAt;
    }

    public get deletedAt(): Date | null {
        return this._deletedAt;
    }

    public get isDeleted(): boolean {
        return this._deletedAt !== null;
    }

    public delete(): void {
        if (!this.isDeleted) this._deletedAt = new Date();
    }
}
