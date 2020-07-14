import io from "socket.io";
import log from "../utils/logger";

import { validate } from "class-validator";
import { getManager } from "typeorm";

import { User } from "../models/User";
import { Message } from "../models/Message";
export default async function CreateMessage(socket: io.Socket, payload) {
  try {
    const user = await User.findOne({
      where: { id: payload.userIdentifier },
      relations: ["room"]
    });

    if (!user) {
      log.warn({ message: "no user found" });
      return null;
    }

    const message = new Message();
    message.text = payload.text;
    message.user = user;
    message.room = user.room;

    const errors = await validate(message);
    if (errors.length > 0) {
      throw errors;
    } else {
      await getManager().transaction(async transactionalEntityManager => {
        const saved = await transactionalEntityManager.save(message);
        socket.emit("MESSAGE_CREATED", {
          messages: saved
        });
        socket.to(user.room.identifier).broadcast.emit("MESSAGE_CREATED", {
          messages: saved
        });
      });
    }
  } catch (error) {
    log.error(error);
  }
}
