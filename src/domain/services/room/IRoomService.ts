import { JoinRoomRequest } from "./args/JoinRoomRequest";
import { JoinRoomResponse } from "./args/JoinRoomResponse";
import { LeaveRoomRequest } from "./args/LeaveRoomRequest";
import { LeaveRoomResponse } from "./args/LeaveRoomResponse";

export interface IRoomService {
  joinRoom(payload: JoinRoomRequest): Promise<JoinRoomResponse>;
  leaveRoom(payload: LeaveRoomRequest): Promise<LeaveRoomResponse>;
}
