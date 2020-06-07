import "reflect-metadata";

import createServer from "./plugins/createServer";
import connectSocketIO from "./plugins/connectSocketIO";

const server = createServer();
connectSocketIO(server);

