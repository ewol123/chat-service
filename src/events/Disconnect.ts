import io from "socket.io";
import log from "../utils/logger";

import { getManager } from "typeorm";

import { Room } from "../models/Room";
import { User } from "../models/User";

export default async function Disconnect(socket: io.Socket) {
  try {
    log.info(`${socket.id} disconnected`);

    const user = await User.findOne({
      where: { socketId: socket.id },
      relations: ["room"]
    });

    if (!user) {
      log.warn({ message: "no user found in the room" });
      return null;
    }

    const room = await Room.findOne({
      where: { id: user.room.id }
    });
    if (!room) {
      log.warn({ message: "no user found in the room" });
      return null;
    }

    room.users = room.users.filter(user => user.socketId !== socket.id);

    await getManager().transaction(async transactionalEntityManager => {
      await transactionalEntityManager.save(room);
      socket.leave(room.identifier, err => {
        if (err) throw err;
        socket.to(room.identifier).broadcast.emit("LEFT_ROOM", {
          users: room.users
        });
      });
    });
  } catch (error) {
    log.error(error);
  }
}
