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
  origin: false,
});

server.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
});

server.get("/tracker", async (request, reply) => {
  return reply.sendFile("tracker.js");
});

server.post("/track", async (request, reply) => {
  const track =
    typeof request.body === "string" ? JSON.parse(request.body) : request.body;
  console.log("Track data", track);

  try {
    const tracks = await Track.insertMany(track);
    reply.status(422);
    reply.send(tracks);
  } catch (error) {
    reply.status(200).send(error);
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
