import { IsString } from "class-validator";

export class DisconnectRequest {
  @IsString()
  socketId: string;
}
