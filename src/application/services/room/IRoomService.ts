import { JoinRoomRequest } from "./dto/JoinRoomRequest";
import { JoinRoomResponse } from "./dto/JoinRoomResponse";
import { LeaveRoomRequest } from "./dto/LeaveRoomRequest";
import { LeaveRoomResponse } from "./dto/LeaveRoomResponse";

export interface IRoomService {
  joinRoom(payload: JoinRoomRequest): Promise<JoinRoomResponse>;
  leaveRoom(payload: LeaveRoomRequest): Promise<LeaveRoomResponse>;
}
