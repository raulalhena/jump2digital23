import { ApiProperty } from "@nestjs/swagger";

export class CreateSkinsDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  type: string;
  @ApiProperty()
  color: string;
  @ApiProperty()
  price: number;
}
