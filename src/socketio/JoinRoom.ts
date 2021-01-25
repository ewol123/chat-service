import io from "socket.io";
import { pick } from "lodash";
import log from "../utils/logger";

import { JoinRoomRequest } from "../domain/services/room/args/JoinRoomRequest";
import { services } from "../plugins/connectSocketIO";
export default async function JoinRoom(
  socket: io.Socket,
  payload: JoinRoomRequest,
  services: services
) {
  try {
    const request = new JoinRoomRequest();
    Object.assign(request, pick(payload, ["userIdentifier", "roomIdentifier"]));
    const response = await services.roomService.joinRoom(request);

    socket.join(response.roomIdentifier, (err) => {
      if (err) throw err;
      socket.emit("JOINED_ROOM", response);
      socket.to(response.roomIdentifier).broadcast.emit("BR_JOINED_ROOM", {
        users: response.users,
        error: response.error,
      });
    });
  } catch (error) {
    log.error(error);
  }
}
