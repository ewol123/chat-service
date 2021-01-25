import io from "socket.io";
import { pick } from "lodash";
import log from "../utils/logger";

import { JoinChimeMeetingRequest } from "../domain/services/chime/args/JoinChimeMeetingRequest";
import { services } from "../plugins/connectSocketIO";

export default async function JoinChimeMeeting(
  socket: io.Socket,
  payload: JoinChimeMeetingRequest,
  services: services
) {
  try {
    const request = new JoinChimeMeetingRequest();
    Object.assign(request, pick(payload, ["userIdentifier", "meetingId"]));
    const response = await services.chimeService.joinChimeMeeting(request);
    socket.emit("JOINED_CHIME_MEETING", response);
  } catch (error) {
    log.error(error);
  }
}
