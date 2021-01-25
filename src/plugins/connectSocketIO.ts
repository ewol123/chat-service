import http from "http";
import io from "socket.io";
import log from "../utils/logger";

import EVENT_TYPES from "../socketio/index";

import { IChimeService } from "../domain/services/chime/IChimeService";
import { IMessageService } from "../domain/services/message/IMessageService";
import { IRoomService } from "../domain/services/room/IRoomService";
import { IUserService } from "../domain/services/user/IUserService";
import { ICommonService } from "../domain/services/common/ICommonService";


export interface services {
  chimeService: IChimeService;
  messageService: IMessageService;
  roomService: IRoomService;
  userService: IUserService;
  commonService: ICommonService;
}

export default function connectSocketIo(
  server: http.Server,
  services: services
): io.Server {
  const ioServer = io(server);

  ioServer.on("connection", (socket) => {
    for (const TYPE of Object.keys(EVENT_TYPES)) {
      socket.on(TYPE, (payload) => {
        EVENT_TYPES[TYPE](socket, payload, services);
      });
    }
  });
  log.info(`Socket.io connected to server`);
  return ioServer;
}
