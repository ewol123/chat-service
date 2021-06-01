import { IsUUID, IsString } from "class-validator";

export class JoinRoomRequest {
  @IsString()
  @IsUUID(4)
  userIdentifier: string;
  
  @IsString()
  @IsUUID(4)
  roomIdentifier: string;
}
