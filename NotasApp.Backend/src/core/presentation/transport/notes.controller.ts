import { CreateNoteDto } from "./dto/create-note.dto";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { DeleteNoteQueryDto } from "./dto/delete-note-query.dto";
import { CurrentUser } from "../decorators/current-user.decorator";
import { NoteDto } from "../../application/use-cases/store-note-use-case/store-note.dto";
import { StoreNoteUseCase, FindNotesPaginatedUseCase, DeleteNoteUseCase } from "../../application/use-cases";
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from "@nestjs/common";
import { FindNotesPaginatedResponseDto } from "../../application/use-cases/find-notes-paginated-use-case/find-notes-paginated.dto";
import { ApiTags, ApiBearerAuth, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiUnauthorizedResponse } from "@nestjs/swagger";

@ApiTags("Notes")
@ApiBearerAuth()
@ApiUnauthorizedResponse({ description: "Missing, invalid, or expired access token." })
@UseGuards(JwtAuthGuard)
@Controller("notes")
export class NotesController {
    constructor(
        private readonly _storeNoteUseCase: StoreNoteUseCase,
        private readonly _deleteNoteUseCase: DeleteNoteUseCase,
        private readonly _findNotesPaginatedUseCase: FindNotesPaginatedUseCase,
    ) { }

    @Post()
    @ApiOperation({ summary: "Create a note for the authenticated user" })
    @ApiCreatedResponse({ description: "Note created." })
    public create(@CurrentUser() userId: string, @Body() { title, content }: CreateNoteDto): Promise<NoteDto> {
        return this._storeNoteUseCase.execute({ userId, title, content });
    }

    @Get()
    @ApiOperation({ summary: "List the authenticated user's notes (paginated)" })
    @ApiOkResponse({ description: "Paginated list of notes." })
    public list(@CurrentUser() userId: string, @Query() { page, pageSize }: PaginationQueryDto): Promise<FindNotesPaginatedResponseDto> {
        return this._findNotesPaginatedUseCase.execute({ userId, page, pageSize });
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: "Soft-delete one of the authenticated user's notes" })
    @ApiNoContentResponse({ description: "Note deleted." })
    @ApiNotFoundResponse({ description: "Note not found or not owned by the user." })
    public remove(@CurrentUser() userId: string, @Query() { id }: DeleteNoteQueryDto): Promise<void> {
        return this._deleteNoteUseCase.execute(id, userId);
    }
}
