import "reflect-metadata";

import createServer from "./plugins/createServer";
import connectSocketIO from "./plugins/connectSocketIO";

async function main(){
  const server = await createServer(true);
  connectSocketIO(server);
}

main();