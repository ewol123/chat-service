import Disconnect from "./Disconnect";
import Ping from "./Ping";
import JoinRoom from "./JoinRoom";
import CreateUser from "./CreateUser";
import LeaveRoom from "./LeaveRoom";
import CreateMessage from "./CreateMessage";
import CreateChimeMeeting from "./CreateChimeMeeting";
import JoinChimeMeeting from "./JoinChimeMeeting";


export default {
  disconnect: Disconnect,
  PING: Ping,
  JOIN_ROOM: JoinRoom,
  CREATE_USER: CreateUser,
  LEAVE_ROOM: LeaveRoom,
  CREATE_MESSAGE: CreateMessage,
  CREATE_CHIME_MEETING: CreateChimeMeeting,
  JOIN_CHIME_MEETING: JoinChimeMeeting
}