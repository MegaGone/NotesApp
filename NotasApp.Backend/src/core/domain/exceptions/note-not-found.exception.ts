import { DomainException } from "./domain.exception";
import { EnumLike, EnumValue } from "../enums/enum.type";
import { ExceptionType } from "../enums/exception-type.enum";

export class NoteNotFoundException<C extends EnumLike> extends DomainException<C> {
    constructor(code: EnumValue<C>, message?: string) {
        super(message, ExceptionType.NOT_FOUND, code);
    }
}
