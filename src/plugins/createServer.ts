import express from "express";
import http from "http";
import { dbConnect } from "../config/database";
import config from "../config/app";
import log from "../utils/logger";

const { port } = config;

export default function createServer(): http.Server {
  const app = express;
  const server = http.createServer(app);
  server.listen(port, () => {
    log.info("Server listening at port:", port);
    dbConnect();
  });
  return server;
}
