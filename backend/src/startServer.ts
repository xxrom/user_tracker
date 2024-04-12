import { FastifyInstance } from "fastify";
import { envPorts } from "./initServer";
import mongoose from "mongoose";

export const startServer = (
  server: FastifyInstance,
  portKeyName: keyof typeof envPorts,
) => {
  server.listen({ port: server.config[portKeyName] }, async (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    try {
      // Disable default filtering properties that are not in the schema
      mongoose.set("strictQuery", false);

      if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log(">>> MongoDB connected");
      }
    } catch (error) {
      console.error("MongoDB connect issue", error);
      process.exit(1);
    }

    console.log(`>>> Server listening at ${address}`);
  });
};
