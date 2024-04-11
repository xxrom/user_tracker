import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import cors from "@fastify/cors";
import path from "node:path";
import mongoose from "mongoose";
import { Track } from "./trackModel";

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

server.register(cors, {
  origin: "*",
  methods: ["POST", "OPTIONS"],
});

server.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
});

server.get("/tracker", async (request, reply) => {
  console.log(">>> SEND tracker.js");
  return reply.sendFile("tracker.js");
});

server.options("/track", async (request, reply) => {
  console.log("OPTIONS!!!", request.body);
});
server.post("/track", async (request, reply) => {
  console.log(">>> TRACK", request.body);

  try {
    const { tracks } = request.body as { tracks: Array<any> };

    const tracksDocs = await Track.insertMany(tracks);

    reply.status(200).send({ ok: true, data: tracksDocs });
  } catch (error) {
    reply.status(422).send({ ok: false, error });
  }
});

server.listen({ port: 8888 }, async (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://admin:admin@localhost:27017/");
    console.log(">>> MongoDB connected");
  } catch (error) {
    console.error("MongoDB connect issue", error);
    process.exit(1);
  }

  console.log(`>>> Server listening at ${address}`);
});
