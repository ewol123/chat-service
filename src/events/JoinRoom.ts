import io from "socket.io";
import log from "../utils/logger";

import { validate } from "class-validator";
import { getManager } from "typeorm";

import { User } from "../models/User";
import { Room } from "../models/Room";
export default async function JoinRoom(socket: io.Socket, payload) {
  try {
    const user = await User.findOne({ where: { id: payload.userIdentifier } });

    if (!user) {
      log.warn({ message: "no user found" });
      return null;
    }

    const room = new Room();
    room.identifier = payload.roomIdentifier;
    room.users = [user];

    const errors = await validate(room);
    if (errors.length > 0) {
      throw errors;
    } else {
      await getManager().transaction(async transactionalEntityManager => {
        const saved = await transactionalEntityManager.save(room);

        const { identifier, users, messages } = saved;

        socket.join(identifier, err => {
          if (err) throw err;
          socket.emit("JOINED_ROOM", {
            roomIdentifier: identifier,
            users,
            messages,
            isInitialized: true
          });
        });
      });
    }
  } catch (error) {
    log.error(error);
  }
}
