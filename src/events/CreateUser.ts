import io from "socket.io";
import log from "../utils/logger";

export default async function CreateUser(socket: io.Socket) {
  try {
    //todo: finish this
    socket.emit("USER_CREATED", "OK");
  } catch (error) {
    log.error(error);
  }
}
