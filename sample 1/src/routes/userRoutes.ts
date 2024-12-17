// src/routes/userRoutes.ts
import { FastifyInstance } from "fastify";
import { getAllUsers, getUserByName } from "../controllers/userController.ts";

export const userRoutes = async (fastify: FastifyInstance) => {
  fastify.get("/users", getAllUsers);
  fastify.get("/user/:name", getUserByName);
};
