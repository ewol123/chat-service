import io from "socket.io";
import { pick } from "lodash";
import log from "../utils/logger";

import { LeaveRoomRequest } from "../application/services/room/dto/LeaveRoomRequest";
import { services } from "../plugins/connectSocketIO";

export default async function LeaveRoom(
  socket: io.Socket,
  payload: LeaveRoomRequest,
  services: services
) {
  try {
    const request = new LeaveRoomRequest();
    Object.assign(request, pick(payload, ["userIdentifier"]));
    const response = await services.roomService.leaveRoom(request);

    socket.leave(response.roomIdentifier, (err) => {
      if (err) throw err;
      socket.emit("LEFT_ROOM", {status: "OK", error: response.error});
      socket.to(response.roomIdentifier).broadcast.emit("BR_LEFT_ROOM", {
        users: response.users,
        error: response.error,
      });
    });
  } catch (error) {
    log.error(error);
  }
}
