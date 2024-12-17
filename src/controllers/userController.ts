// src/controllers/userController.ts
import { FastifyReply, FastifyRequest } from "fastify";
import { users } from "../data/users";
import { User } from "../types/user";

export const getAllUsers = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return reply.send(users);
};

export const getUserByName = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name } = request.params as { name: string };

  const user = users.find((u) => u.name.toLowerCase() === name.toLowerCase());

  if (!user) {
    return reply.status(404).send({ message: "User not found" });
  }

  return reply.send(user);
};
