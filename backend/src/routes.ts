import { FastifyInstance } from "fastify";
import { Track } from "./trackModel";

export const addRoutes = (server: FastifyInstance) => {
  server.get("/tracker", async (_request, reply) => {
    return reply.sendFile("tracker.js");
  });

  server.post("/track", async (request, reply) => {
    try {
      const { tracks } = (
        typeof request.body === "string"
          ? JSON.parse(request.body)
          : request.body
      ) as { tracks: Array<any> };

      const tracksDocs = await Track.insertMany(tracks);

      reply.status(200).send({ ok: true, data: tracksDocs });
    } catch (error) {
      reply.status(422).send({ ok: false, error });
    }
  });
};
