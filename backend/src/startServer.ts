import { FastifyInstance } from "fastify";
import { envPorts } from "./initServer";
import mongoose from "mongoose";

export const startServer = (
  server: FastifyInstance,
  portKeyName: keyof typeof envPorts,
) => {
  server.listen(
    { port: server.config[portKeyName], host: "0.0.0.0" },
    async (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      try {
        // Disable default filtering properties that are not in the schema
        mongoose.set("strictQuery", false);

        if (!mongoose.connection.readyState) {
          await mongoose.connect(server.config.MONGO_URL as string);
          console.log(">>> MongoDB connected: ", server.config.MONGO_URL);
        }
      } catch (error) {
        console.error("MongoDB connect issue url: ", server.config.MONGO_URL);
        console.error("MongoDB connect issue: ", error);
        //process.exit(1);
      }

      console.log(`>>> Server listening at ${address}`);
    },
  );
};
