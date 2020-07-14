
import http from "http";
import io from "socket.io";
import redisAdapter from 'socket.io-redis';
import log from "../utils/logger";

import EVENT_TYPES from "../events/index";
import config from "../config/app";

const {redisHost, redisPort} = config.redis;

export default function connectSocketIo(server: http.Server): io.Server {
    const ioServer = io(server);

    ioServer.adapter(redisAdapter({ host: redisHost, port: redisPort }));

    ioServer.on("connection", socket => {
      for(const TYPE in EVENT_TYPES){
        socket.on(TYPE, (payload) => {
          EVENT_TYPES[TYPE](socket,payload);
        });
      }

    });
    log.info(`Socket.io connected to server`);
    return ioServer;
  }