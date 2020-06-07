import io from "socket.io";
import log from "../utils/logger";

export default async function Disconnect(socket: io.Socket) {
    try {
      log.info(`${socket.id} disconnected`);
    } catch (error) {
      log.error(error);
    }
  }