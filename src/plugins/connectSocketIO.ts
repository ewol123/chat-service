
import http from "http";
import io from "socket.io";
import log from "../utils/logger";
import redisAdapter from 'socket.io-redis';
import config from "../config/app";

import EVENT_TYPES from "../events/index";

const {redisHost, redisPort} = config;

export default function connectSocketIo(server: http.Server): io.Server {
    const ioServer = io(server);
    
    ioServer.adapter(redisAdapter({ host: redisHost, port: redisPort }));
    ioServer.on("connection", socket => {
      for(let TYPE in EVENT_TYPES){
        socket.on(TYPE, (payload) => {
          EVENT_TYPES[TYPE](socket,payload);
        });
      }

    });
    log.info(`Access your app now`);
    return ioServer;
  }