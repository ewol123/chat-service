import io from "socket.io";
import log from "../utils/logger";

import { getManager } from "typeorm";

import { User } from "../models/User";
export default async function LeaveRoom(socket: io.Socket, payload) {
  try {
    const user = await User.findOne({
      where: { id: payload.userIdentifier },
      relations: ["room"]
    });
    if (!user) {
      log.warn({ message: "no user found" });
      return null;
    }
    const userRoom = user.room.identifier;
    user.room = null;

    await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(user);

      socket.leave(userRoom, err => {
        if (err) throw err;
        socket.emit("LEFT_ROOM", {
          roomIdentifier: null,
          users: [],
          messages: [],
          isInitialized: false
        });
        socket.to(room.identifier).broadcast.emit("LEFT_ROOM", {
          users: room.users
        });
      });
    });
  } catch (error) {
    log.error(error);
  }
}
