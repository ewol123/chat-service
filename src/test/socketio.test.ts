import createServer from "../plugins/createServer";
import connectSocketIO from "../plugins/connectSocketIO";
import { v4 as uuidv4 } from "uuid";

import io from "socket.io-client"
import chai from "chai";
import http from "http";
import ioServ from "socket.io";

import { User } from "../models/User";
import { Room } from "../models/Room";
import { Message } from "../models/Message";

const expect = chai.expect;

let httpServer: http.Server;
let httpServerAddr: import("net").AddressInfo;
let ioServer: ioServ.Server;
let socket: SocketIOClient.Socket;

let userId;
const roomIdentifier = uuidv4()

before(async () => {
  httpServer = await createServer(true);
  httpServerAddr = httpServer.address() as import("net").AddressInfo;
  ioServer = connectSocketIO(httpServer);
  return Promise.resolve();
});

after(async () => {
  ioServer.close();
  httpServer.close();
  await Message.delete({user:{id:userId}});
  await User.delete({id: userId});
  await Room.delete({identifier: roomIdentifier})
  return Promise.resolve();
});

beforeEach((done) => {
  socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
    reconnectionDelay: 0,
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    done();
  });
});


afterEach((done) => {
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});


describe('basic socket.io example', () => {
  it('should communicate', (done) => {
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message) => {
      expect(message).to.equal('Hello World')
      done();
    });
  });
  it('should register events', (done) => {
    socket.emit("PING");
    socket.once('PONG', (message) => {
      expect(message).to.equal('OK')
      done();
    });
  });
  it('should create user', (done) => {
    socket.emit("CREATE_USER", {name: "hello_world"});
    socket.once('USER_CREATED', (payload) => {
      expect(payload).to.be.an("object");
      expect(payload).to.have.property("user");
      expect(payload.user).to.have.property("id");
      expect(payload.user).to.have.property("name");
      expect(payload.user.name).to.equal("hello_world");
      userId = payload.user.id;
      done();
    });
  });
  it('should join room', (done) => {
    socket.emit("JOIN_ROOM", {userIdentifier: userId, roomIdentifier});
    socket.once('JOINED_ROOM', (payload) => {
      expect(payload).to.be.an("object");
      expect(payload).to.have.property("roomIdentifier");
      expect(payload).to.have.property("users");
      expect(payload).to.have.property("messages");
      expect(payload).to.have.property("isInitialized");

      expect(payload.roomIdentifier).to.equal(roomIdentifier);
      expect(payload.users).to.be.an("array");
      expect(payload.messages).to.be.an("array");
      expect(payload.isInitialized).to.equal(true);

      done();
    });
  });
  it('should create a message', (done) => {
    socket.emit("CREATE_MESSAGE", {userIdentifier: userId, text: "hello"});
    socket.once('MESSAGE_CREATED', (payload) => {
      expect(payload).to.be.an("object");
      expect(payload).to.have.property("messages");
      expect(payload.messages).to.have.property("text");
      expect(payload.messages).to.have.property("stamp");
      expect(payload.messages).to.have.property("user");
      expect(payload.messages).to.have.property("room");

      expect(payload.messages).to.be.an("object");
      expect(payload.messages.text).to.equal("hello");
      expect(payload.messages.stamp).to.be.a("string");
      expect(payload.messages.user).to.be.an("object");
      expect(payload.messages.room).to.be.an("object");

      done();
    });
  });
  it('should leave room', (done) => {
    socket.emit("LEAVE_ROOM", {userIdentifier: userId});
    socket.once('LEFT_ROOM', (payload) => {
      expect(payload).to.be.an("object");
      expect(payload).to.have.property("roomIdentifier");
      expect(payload).to.have.property("users");
      expect(payload).to.have.property("messages");
      expect(payload).to.have.property("isInitialized");

      expect(payload.roomIdentifier).to.equal(null);
      expect(payload.users).to.be.an("array");
      expect(payload.messages).to.be.an("array");
      expect(payload.isInitialized).to.equal(false);

      done();
    });
  });
});
