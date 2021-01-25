import io from "socket.io";
import { pick } from "lodash";
import log from "../utils/logger";

import { CreateChimeMeetingRequest } from "../domain/services/chime/args/CreateChimeMeetingRequest";
import { services } from "../plugins/connectSocketIO";

export default async function CreateChimeMeeting(
  socket: io.Socket,
  payload: CreateChimeMeetingRequest,
  services: services
) {
  try {
    const request = new CreateChimeMeetingRequest();
    Object.assign(request, pick(payload, ["userIdentifier"]));
    const response = await services.chimeService.createChimeMeeting(request);
    socket.emit("CHIME_MEETING_CREATED", response);
  } catch (error) {
    log.error(error);
  }
}
