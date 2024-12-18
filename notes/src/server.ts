import fastify from "fastify";
import { notesRoutes } from "./routes/notesRoutes.ts";
import process from "node:process";

const app = fastify({ logger: true });

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

const startServer = async () => {
  try {
    // Register routes
    await app.register(notesRoutes);

    await app.listen({
      port: PORT,
      host: "0.0.0.0",
    });

    app.log.info(`Server is running on port ${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

startServer();
