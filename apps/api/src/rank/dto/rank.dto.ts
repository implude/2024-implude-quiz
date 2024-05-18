import { IsNumber, IsString } from "class-validator";

export class rankDTO {
  @IsString()
  name: string;
  @IsNumber()
  score: number;
  @IsNumber()
  sec: number;
}
