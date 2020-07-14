import io from "socket.io";
import log from "../utils/logger";

export default async function Ping(socket: io.Socket) {
    try {
      socket.emit('PONG', 'OK');
    } catch (error) {
      log.error(error);
    }
  }