import { ApiProperty } from "@nestjs/swagger";

export class UpdateSkinsDto {
    @ApiProperty()
    skinId: string;
    @ApiProperty()
    userId: string;
    @ApiProperty()
    color: string;
}
