// src/server.ts
import fastify from "fastify";
import { userRoutes } from "./src/routes/userRoutes";

const app = fastify({ logger: true });

const startServer = async () => {
  try {
    // Register routes
    await app.register(userRoutes);

    // Root route
    app.get("/", async (request, reply) => {
      return { hello: "world" };
    });

    const PORT =  3000;

    await app.listen({
      port: Number(PORT),
      host: "0.0.0.0",
    });

    app.log.info(`Server is running on ${PORT}`);
  } catch (err) {
    app.log.error(err);
  }
};

startServer();
