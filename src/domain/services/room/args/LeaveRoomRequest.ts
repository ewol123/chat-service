import { IsUUID, IsString } from "class-validator";
export class LeaveRoomRequest {
  @IsString()
  @IsUUID(4)
  userIdentifier: string;
}
