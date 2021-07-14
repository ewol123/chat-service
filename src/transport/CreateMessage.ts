import io from "socket.io";
import { pick } from "lodash";
import log from "../utils/logger";

import { CreateMessageRequest } from "../application/services/message/dto/CreateMessageRequest";
import { services } from "../plugins/connectSocketIO";

export default async function CreateMessage(
  socket: io.Socket,
  payload: CreateMessageRequest,
  services: services
) {
  try {
    const request = new CreateMessageRequest();
    Object.assign(request, pick(payload, ["text", "userIdentifier"]));
    const response = await services.messageService.createMessage(request);

    socket.emit("MESSAGE_CREATED", response);
    socket
      .to(response.roomIdentifier)
      .broadcast.emit("BR_MESSAGE_CREATED", response);
  } catch (error) {
    log.error(error);
  }
}
