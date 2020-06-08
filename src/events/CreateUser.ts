import io from "socket.io";
import log from "../utils/logger";

import { validate } from "class-validator";
import { getManager } from "typeorm";

import { User } from "../models/User";
export default async function CreateUser(socket: io.Socket, payload) {
  try {
    const user = new User();
    user.name = payload.name;

    const errors = await validate(user);
    if (errors.length > 0) {
      throw errors;
    } else {
      await getManager().transaction(async transactionalEntityManager => {
        const saved = await transactionalEntityManager.save(user);
        socket.emit("USER_CREATED", {
          user: { id: saved.id, name: saved.name }
        });
      });
    }
  } catch (error) {
    log.error(error);
  }
}
