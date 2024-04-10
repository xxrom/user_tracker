import fastify from "fastify";
import fastifyStatic from "@fastify/static";
import path from "node:path";

const server = fastify({ logger: true });

server.register(fastifyStatic, {
  root: path.join(__dirname, "../public"),
});

server.get("/tracker", async (request, reply) => {
  return reply.sendFile("tracker.js");
});
server.get("/ping", async (request, reply) => {
  return "pong\n";
});

server.listen({ port: 8888 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`>>> Server listening at ${address}`);
});
