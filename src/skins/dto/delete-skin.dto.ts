import { ApiProperty } from "@nestjs/swagger";

export class DeleteSkinDto {
    @ApiProperty()
    userId: string;
}