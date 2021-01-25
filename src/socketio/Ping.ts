import io from "socket.io";
import log from "../utils/logger";

import { PingResponse } from "../domain/services/common/args/PingResponse";
import { services } from "../plugins/connectSocketIO";

export default async function Ping(
  socket: io.Socket,
  _payload: PingResponse,
  services: services
) {
  try {
    const response = await services.commonService.ping();
    socket.emit("PONG", response);
  } catch (error) {
    log.error(error);
  }
}
