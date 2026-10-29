import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class DeleteNoteQueryDto {
    @ApiProperty({ description: "Id of the note to delete." })
    @IsUUID()
    id: string;
}
