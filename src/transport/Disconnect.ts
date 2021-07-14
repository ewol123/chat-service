import io from "socket.io";
import log from "../utils/logger";

import { DisconnectRequest } from "../application/services/user/dto/DisconnectRequest";
import { services } from "../plugins/connectSocketIO";

export default async function Disconnect(
  socket: io.Socket,
  _payload: DisconnectRequest,
  services: services
) {
  try {
    const request = new DisconnectRequest();
    Object.assign(request, { socketId: socket.id });
    const response = await services.userService.disconnect(request);

    socket.leave(response.roomIdentifier, (err) => {
      if (err) throw err;
      socket.to(response.roomIdentifier).broadcast.emit("BR_LEFT_ROOM", {
        users: response.users,
      });
    });
  } catch (error) {
    log.error(error);
  }
}
