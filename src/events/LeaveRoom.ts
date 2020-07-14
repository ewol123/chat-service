import io from "socket.io";
import log from "../utils/logger";

import { getManager } from "typeorm";

import { Room } from "../models/Room";
import { User } from "../models/User";


export default async function LeaveRoom(socket: io.Socket, payload) {
  try {

    const user = await User.findOne({
      where: { id: payload.userIdentifier },
      relations: ["room"]
    });

    if (!user) {
      log.warn({ message: "no user found in the room" });
      return null;
    }

    const room = await Room.findOne({
      where: { id: user.room.id}
    });

    if(!room) {
      log.warn({ message: "no user found in the room" });
      return null;
    }

    room.users = room.users.filter(user => user.id !== payload.userIdentifier);

    await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(room);
      socket.leave(room.identifier, err => {
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
