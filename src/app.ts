import "reflect-metadata";

import log from "./utils/logger";
import createServer from "./plugins/createServer";
import connectSocketIO from "./plugins/connectSocketIO";

async function main(){
  const server = await createServer(true);
  connectSocketIO(server);
}

process.on("unhandledRejection", (reason, p) => {
  log.error("Unhandled Rejection at:", p, "reason:", reason);
});

main();