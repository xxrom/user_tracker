import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import fastifyEnv from "@fastify/env";
import path from "node:path";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT0: number;
      PORT1: number;
      MONGO_URL: string;
    };
  }
}

export const envPorts = {
  PORT0: {
    type: "number",
    default: 8889,
  },
  PORT1: {
    type: "number",
    default: 50001,
  },
};
const envSchema = {
  type: "object",
  required: ["MONGO_URL", ...Object.keys(envPorts)],
  properties: {
    ...envPorts,
    MONGO_URL: {
      type: "string",
      default: "mongodb://admin:admin@localhost:27017/",
    },
  },
};

export const initServer = async () => {
  const server = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
  });

  await server
    .register(fastifyEnv, {
      dotenv: true,
      schema: envSchema,
    })
    .register(cors, {
      origin: "*",
      methods: ["POST", "OPTIONS"],
    })
    .register(fastifyStatic, {
      root: path.join(__dirname, "../public"),
    });

  return server;
};
