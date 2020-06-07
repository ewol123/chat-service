import io from "socket.io";
import log from "../utils/logger";

export default async function JoinRoom(socket: io.Socket) {
  try {
    //todo: finish this
    socket.emit("JOINED_ROOM", "OK");
  } catch (error) {
    log.error(error);
  }
}
