import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";

export class CreateNoteDto {
    @ApiProperty({ example: "Recordatorio", description: "Note title." })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: "Estudiar para el parcial.", description: "Note content." })
    @IsString()
    @IsNotEmpty()
    content: string;
}
