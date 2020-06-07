import createServer from "../plugins/createServer";
import connectSocketIO from "../plugins/connectSocketIO";

import io from "socket.io-client"
import chai from "chai";
import http from "http";
import ioServ from "socket.io";

const expect = chai.expect;

let httpServer: http.Server;
let httpServerAddr: import("net").AddressInfo;
let ioServer: ioServ.Server;
let socket: SocketIOClient.Socket;

before((done) => {
  httpServer = createServer();
  httpServerAddr = httpServer.address() as import("net").AddressInfo;
  ioServer = connectSocketIO(httpServer);
  done();
});

after((done) => {
  ioServer.close();
  httpServer.close();
  done();
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
});
