import express from "express";
import http from "http";
import { dbConnect } from "../config/database";
import config from "../config/app";
import log from "../utils/logger";

const { port } = config;

export default async function createServer(migrate: boolean = false): Promise<http.Server> {
  const app = express();

  app.get('/', (request, response) => {
    response.send('healthcheck');
  });

  const server = http.createServer(app);


  await server.listen(port);
  log.info("Server listening at port:", port);
  await dbConnect(migrate);
  return server;
}
