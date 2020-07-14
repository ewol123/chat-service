import Disconnect from "./Disconnect";
import Ping from "./Ping";
import JoinRoom from "./JoinRoom";
import CreateUser from "./CreateUser";
import LeaveRoom from "./LeaveRoom";
import CreateMessage from "./CreateMessage";

export default {
  disconnect: Disconnect,
  PING: Ping,
  JOIN_ROOM: JoinRoom,
  CREATE_USER: CreateUser,
  LEAVE_ROOM: LeaveRoom,
  CREATE_MESSAGE: CreateMessage
}