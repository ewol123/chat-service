import { Length, IsString } from "class-validator";

export class CreateUserRequest {
  @IsString()
  @Length(1, 255)
  name: string;
  
  @IsString()
  socketId: string;
}
