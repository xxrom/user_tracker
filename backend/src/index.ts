import { initServer } from "./initServer";
import { addRoutes } from "./routes";
import { startServer } from "./startServer";

const run = async () => {
  const server0 = await initServer();
  const server1 = await initServer();

  addRoutes(server0);
  addRoutes(server1);

  startServer(server0, "PORT0");
  startServer(server1, "PORT1");
};

run();
