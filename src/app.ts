import log from "./utils/logger";

import { main } from "./plugins/startup";

process.on("unhandledRejection", (reason, p) => {
  log.error("Unhandled Rejection at:", p, "reason:", reason);
});

main();
