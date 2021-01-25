const TYPES = {
  IMessageRepository: Symbol.for("IMessageRepository"),
  IRoomRepository: Symbol.for("IRoomRepository"),
  IUnitOfWork: Symbol.for("IUnitOfWork"),
  IUserRepository: Symbol.for("IUserRepository"),
  IChimeService: Symbol.for("IChimeService"),
  IMessageService: Symbol.for("IMessageService"),
  IRoomService: Symbol.for("IRoomService"),
  IUserService: Symbol.for("IUserService"),
  DbConnection: Symbol.for("Connection")
};

export { TYPES };
