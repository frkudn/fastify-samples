// deno-lint-ignore-file no-unused-vars
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { NotesService } from "../services/note_services.ts";

export const notesRoutes = async (fastify: FastifyInstance) => {
  const notesService = new NotesService();

  // GET route to retrieve all notes
  fastify.get("/notes", async (request : FastifyRequest, reply: FastifyReply) => {
    try {
      const notesResponse = await notesService.getAllNotes();
      const notes = await notesResponse.json();
      return reply.status(notesResponse.status).send(notes);
    } catch (error) {
      return reply.status(500).send({
        message: "Failed to retrieve notes",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // POST route to create a new note
  fastify.post("/notes", async (request, reply) => {
    try {
      // Create a Request object compatible with the service method
      const requestBody = await request.body;
      const fakeRequest = {
        json: async () => requestBody,
      } as Request;

      const noteResponse = await notesService.createNote(fakeRequest);
      const result = await noteResponse.json();
      return reply.status(noteResponse.status).send(result);
    } catch (error) {
      return reply.status(500).send({
        message: "Failed to create note",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
};
