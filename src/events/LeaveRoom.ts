import io from "socket.io";
import log from "../utils/logger";

import { getManager } from "typeorm";

import { Room } from "../models/Room";

export default async function LeaveRoom(socket: io.Socket, payload) {
  try {
    const room = await Room.findOne({
      where: {users:[{id: payload.userIdentifier}]}
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
