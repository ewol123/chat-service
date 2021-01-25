import express from "express";
import http from "http";
import config from "../infrastructure/app";
import log from "../utils/logger";

const { port } = config;

export default async function createServer(): Promise<http.Server> {
  const app = express();

  app.get('/', (request, response) => {
    response.send('healthcheck');
  });

  const server = http.createServer(app);


  await server.listen(port);
  log.info("Server listening at port:", port);  
  return server;
}
