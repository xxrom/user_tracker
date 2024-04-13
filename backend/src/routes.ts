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

      const tracksDocs = tracks.map((track) => new Track(track));
      await Promise.all(tracksDocs.map((track) => track.validate()));

      reply.status(200).send({ ok: true });

      Track.insertMany(tracksDocs).catch((error) => {
        console.error("Failed to insert tracks", error);
      });

      return reply;
    } catch (error) {
      return reply.status(422).send({ ok: false, error });
    }
  });

  server.get("/track", async (request, reply) => {
    try {
      const allTracks = await Track.find({});

      return reply.status(200).send({ ok: true, data: allTracks });
    } catch (error) {
      console.error("error", error);
      return reply.status(422).send({ ok: false, error });
    }
  });
};
