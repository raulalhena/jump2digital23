import { ApiProperty } from "@nestjs/swagger";

export class BuySkinDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  userId: string;
}
