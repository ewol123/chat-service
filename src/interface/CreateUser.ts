import io from "socket.io";
import { pick } from "lodash";

import log from "../utils/logger";

import { CreateUserRequest } from "../application/services/user/dto/CreateUserRequest";
import { services } from "../plugins/connectSocketIO";

export default async function CreateUser(
  socket: io.Socket,
  payload: CreateUserRequest,
  services: services
) {
  try {
    const request = new CreateUserRequest();
    Object.assign(request, pick(payload, ["name"]), { socketId: socket.id });
    const response = await services.userService.createUser(request);
    socket.emit("USER_CREATED", response);
  } catch (error) {
    log.error(error);
  }
}
