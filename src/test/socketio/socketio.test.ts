import io from "socket.io-client";
import http from "http";
import ioServ from "socket.io";
import { expect, assert } from "chai";
import { v4 as uuidv4 } from "uuid";

import { main } from "../../plugins/startup";

let httpServer: http.Server;
let httpServerAddr: import("net").AddressInfo;
let ioServer: ioServ.Server;
let socket: SocketIOClient.Socket;

const user = {
  id: null,
};
const user2 = {
  id: null,
};
const room = {
  identifier: uuidv4(),
};
const meetingResponse = {
  id: null,
};

before(async function () {
  this.timeout(50000);
  const startup = await main();
  httpServer = startup.server;
  httpServerAddr = httpServer.address() as import("net").AddressInfo;
  ioServer = startup.ioServer;
  socket = io.connect(
    `http://[${httpServerAddr.address}]:${httpServerAddr.port}`,
    {
      reconnectionDelay: 0,
      transports: ["websocket"],
    }
  );
  socket.on("connect", () => {
    return Promise.resolve();
  });
});

after(async () => {
  if (socket.connected) {
    socket.close();
  }
  ioServer.close();
  httpServer.close();
  return Promise.resolve();
});
describe("socket.io tests", () => {
  describe("==========CreateUser Event==========", () => {
    it("should create a new user", (done) => {
      const request = {
        name: "Tester",
      };

      socket.emit("CREATE_USER", request);
      socket.once("USER_CREATED", (response) => {
        assert.isUndefined(response.error);
        expect(response).to.have.property("user");
        expect(response.user).to.have.property("id");
        expect(response.user).to.have.property("name");
        user.id = response.user.id;
        done();
      });
    });

    it("should create a new user with the same name", (done) => {
      const request = {
        name: "Tester",
      };

      socket.emit("CREATE_USER", request);
      socket.once("USER_CREATED", (response) => {
        assert.isUndefined(response.error);
        expect(response).to.have.property("user");
        expect(response.user).to.have.property("id");
        expect(response.user).to.have.property("name");
        user2.id = response.user.id;
        done();
      });
    });

    it("should not create a new user in case of validation errors", (done) => {
      const request = {
        name: "",
      };

      socket.emit("CREATE_USER", request);
      socket.once("USER_CREATED", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });

    it("should not create a new user with empty request", (done) => {
      const request = {};

      socket.emit("CREATE_USER", request);
      socket.once("USER_CREATED", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
  });

  describe("==========Ping Event==========", () => {
    it("should return ping response", (done) => {
      socket.emit("PING");
      socket.once("PONG", (message) => {
        expect(message).to.be.an("object");
        expect(message).to.have.property("status");
        expect(message.status).to.equal("OK");
        done();
      });
    });
  });

  describe("==========JoinRoom Event==========", () => {
    it("should join a room", (done) => {
      const request = {
        userIdentifier: user.id,
        roomIdentifier: room.identifier,
      };
      socket.emit("JOIN_ROOM", request);
      socket.once("JOINED_ROOM", (response) => {
        expect(response).to.be.an("object");
        expect(response).to.have.property("roomIdentifier");
        expect(response).to.have.property("users");
        expect(response).to.have.property("messages");
        expect(response.roomIdentifier).to.equal(room.identifier);
        expect(response.users).to.be.an("array");
        expect(response.messages).to.be.an("array");
        assert.isUndefined(response.error);
        done();
      });
    });
    it("should NOT join a room in case of validation errors", (done) => {
      const request = {
        userIdentifier: "abc",
        roomIdentifier: room.identifier,
      };
      socket.emit("JOIN_ROOM", request);

      socket.once("JOINED_ROOM", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT join a room with incorrect user", (done) => {
      const request = {
        userIdentifier: "8d8a70a7-98ff-4d3a-abc0-66d1156148ec",
        roomIdentifier: room.identifier,
      };
      socket.emit("JOIN_ROOM", request);

      socket.once("JOINED_ROOM", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should not join a room with empty request", (done) => {
      const request = {};
      socket.emit("JOIN_ROOM", request);

      socket.once("JOINED_ROOM", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
  });

  describe("==========CreateMessage Event==========", () => {
    it("should create a message", (done) => {
      const request = {
        userIdentifier: user.id,
        text: "hello",
      };
      socket.emit("CREATE_MESSAGE", request);
      socket.once("MESSAGE_CREATED", (response) => {
        expect(response).to.be.an("object");
        expect(response).to.have.property("message");
        expect(response.message).to.be.an("object");

        expect(response.message).to.have.property("text");
        expect(response.message).to.have.property("stamp");
        expect(response.message).to.have.property("user");
        expect(response.message).to.have.property("room");
        done();
      });
    });
    it("should NOT create a message in case of validation errors", (done) => {
      const request = {
        userIdentifier: "asd",
        text: "hello",
      };
      socket.emit("CREATE_MESSAGE", request);
      socket.once("MESSAGE_CREATED", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT create a message with incorrect user", (done) => {
      const request = {
        userIdentifier: "8d8a70a7-98ff-4d3a-abc0-66d1156148ec",
        text: "hello",
      };
      socket.emit("CREATE_MESSAGE", request);
      socket.once("MESSAGE_CREATED", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT create a message if user is not in any room", (done) => {
      const request = {
        userIdentifier: user2.id,
        text: "hello",
      };
      socket.emit("CREATE_MESSAGE", request);
      socket.once("MESSAGE_CREATED", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT create a message with empty request", (done) => {
      const request = {};
      socket.emit("CREATE_MESSAGE", request);

      socket.once("MESSAGE_CREATED", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
  });

  describe("==========CreateChimeMeeting Event==========", () => {
    it("should create a chime meeting", (done) => {
      const request = {
        userIdentifier: user.id,
      };
      socket.emit("CREATE_CHIME_MEETING", request);
      socket.once("CHIME_MEETING_CREATED", (response) => {
        expect(response).to.be.an("object");
        expect(response).to.have.property("meetingResponse");
        expect(response).to.have.property("attendeeResponse");
        expect(response.meetingResponse).to.be.an("object");
        expect(response.attendeeResponse).to.be.an("object");
        meetingResponse.id = response.meetingResponse.Meeting.MeetingId;
        done();
      });
    });
    it("should NOT create a chime meeting in case of validation errors", (done) => {
      const request = {
        userIdentifier: "asd",
      };
      socket.emit("CREATE_CHIME_MEETING", request);
      socket.once("CHIME_MEETING_CREATED", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT create a chime meeting with incorrect user", (done) => {
      const request = {
        userIdentifier: "8d8a70a7-98ff-4d3a-abc0-66d1156148ec",
      };
      socket.emit("CREATE_CHIME_MEETING", request);
      socket.once("CHIME_MEETING_CREATED", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT create a chime meeting with empty request", (done) => {
      const request = {};
      socket.emit("CREATE_CHIME_MEETING", request);

      socket.once("CHIME_MEETING_CREATED", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
  });

  describe("==========JoinChimeMeeting Event==========", () => {
    it("should join a chime meeting", (done) => {
      const request = {
        userIdentifier: user2.id,
        meetingId: meetingResponse.id,
      };
      socket.emit("JOIN_CHIME_MEETING", request);
      socket.once("JOINED_CHIME_MEETING", (response) => {
        expect(response).to.be.an("object");
        expect(response).to.have.property("attendeeResponse");
        expect(response.attendeeResponse).to.be.an("object");
        done();
      });
    });
    it("should NOT join a chime meeting in case of validation errors", (done) => {
      const request = {
        userIdentifier: "asd",
        meetingId: meetingResponse.id,
      };
      socket.emit("JOIN_CHIME_MEETING", request);
      socket.once("JOINED_CHIME_MEETING", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT join a chime meeting with incorrect user", (done) => {
      const request = {
        userIdentifier: "8d8a70a7-98ff-4d3a-abc0-66d1156148ec",
        meetingId: meetingResponse.id,
      };
      socket.emit("JOIN_CHIME_MEETING", request);
      socket.once("JOINED_CHIME_MEETING", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT join a chime meeting with empty request", (done) => {
      const request = {};
      socket.emit("JOIN_CHIME_MEETING", request);

      socket.once("JOINED_CHIME_MEETING", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
  });
  describe("==========LeaveRoom Event==========", () => {
    it("should leave a room", (done) => {
      const request = {
        userIdentifier: user.id,
      };
      socket.emit("LEAVE_ROOM", request);
      socket.once("LEFT_ROOM", (response) => {
        expect(response).to.be.an("object");
        expect(response).to.have.property("status");
        expect(response.status).to.be.a("string");
        done();
      });
    });
    it("should NOT leave a room in case of validation errors", (done) => {
      const request = {
        userIdentifier: "asd",
      };
      socket.emit("LEAVE_ROOM", request);
      socket.once("LEFT_ROOM", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT leave a room with incorrect user", (done) => {
      const request = {
        userIdentifier: "8d8a70a7-98ff-4d3a-abc0-66d1156148ec",
      };
      socket.emit("LEAVE_ROOM", request);
      socket.once("LEFT_ROOM", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
    it("should NOT leave a room with empty request", (done) => {
      const request = {};
      socket.emit("LEAVE_ROOM", request);

      socket.once("LEFT_ROOM", (response) => {
        expect(response).to.have.property("error");
        expect(response.error).to.be.an("object");
        expect(response.error.businessErrors).to.be.an("array");
        expect(response.error.businessErrors.length).to.be.greaterThan(0);
        done();
      });
    });
  });
  describe("==========Disconnect Event==========", () => {
    it("should disconnect properly", (done) => {
      socket.emit("DISCONNECT");
      done();
    });
    it("should disconnect properly and discard request object", (done) => {
      const request = {
        userIdentifier: user2.id,
      };
      socket.emit("DISCONNECT", request);
      done();
    });
  });
});
