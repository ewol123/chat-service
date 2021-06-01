import { Message } from "../../core/models/Message";
import { Room } from "../../core/models/Room";
import { User } from "../../core/models/User";

const message1 = new Message();
message1.id = "b8beb1be-02f8-4b20-9005-6d0c419d6480";
message1.stamp = new Date();
message1.text = "Hello";
const message2 = new Message();
message2.id = "79e38194-e24d-4b07-a6da-59533d5f073f";
message2.stamp = new Date();
message2.text = "Hi";
const message3 = new Message();
message3.id = "6dc2477c-8888-4e3d-a82f-0e03d54293b8";
message3.stamp = new Date();
message3.text = "How are you?";
const message4 = new Message();
message4.id = "7dc4ec46-67aa-4fcd-b97c-4d55bea4bd4e";
message4.stamp = new Date();
message4.text = "I'm fine thanks, and you?";
const message5 = new Message();
message5.id = "894a0adc-d9d8-468f-825b-64a6ae628ec3";
message5.stamp = new Date();
message5.text = "I'm fine too";
const message6 = new Message();
message6.id = "40774df5-4930-4e8c-aaa4-ff5c7c3ab296";
message6.stamp = new Date();
message6.text = "This is some";
const message7 = new Message();
message7.id = "48900a17-246a-4354-be14-10ed10249903";
message7.stamp = new Date();
message7.text = "test message";
const message8 = new Message();
message8.id = "44257417-0fd8-4adc-9890-fb3f5bf885d1";
message8.stamp = new Date();
message8.text = "say something";
const message9 = new Message();
message9.id = "1ef2a84e-cfde-4ac8-9f10-abb30d697f49";
message9.stamp = new Date();
message9.text = "this is for the greater good";
const message10 = new Message();
message10.id = "06d3f903-86b4-47ac-b12d-37fbb1b554f9";
message10.stamp = new Date();
message10.text = "i don't know what to say";

const room1 = new Room();
room1.id = "ff2f974b-43ff-4644-957f-8ac1c434efc8";
room1.identifier = "ac94782d-dadc-49cd-bb33-9fcf215a3e61";
room1.users = null;
const room2 = new Room();
room2.id = "02aabd83-4768-4bec-ab17-2b6a2cc8cb45";
room2.identifier = "690a2d7a-4160-4451-a14e-045053f30a50";
room2.users = null;
const room3 = new Room();
room3.id = "ee038d71-3184-4185-bba3-bbcecaf20f29";
room3.identifier = "3abdbcc8-2ef3-4bc7-a464-7a63da8eaf3e";
room3.users = null;
const room4 = new Room();
room4.id = "0cd426ea-e6c2-433b-a13c-e8ec415ecf82";
room4.identifier = "8f29e633-96a4-4b10-b671-7b1043db7559";
room4.users = null;
const room5 = new Room();
room5.id = "e741a269-8393-4973-9878-770d74414ab6";
room5.identifier = "320d7024-fd17-4987-8dc5-8c8cfc606897";
room5.users = null;
const room6 = new Room();
room6.id = "84aa85e8-d2e9-46d1-a0e4-1366f2572982";
room6.identifier = "fd48d9a4-453a-4e44-b28d-a5dfcfeaf06d";
room6.users = null;
const room7 = new Room();
room7.id = "9bc16e50-0d79-4c7d-97a9-e3033e901ff3";
room7.identifier = "48f0fed7-f872-4575-bfb1-3c358cbc15d5";
room7.users = null;
const room8 = new Room();
room8.id = "481de23b-ab76-4f06-a660-c9feb80f2f19";
room8.identifier = "b5249924-0949-40c3-bb6b-d3be6f79a7ca";
room8.users = null;
const room9 = new Room();
room9.id = "6d7f03d2-750d-422a-a968-6ce475e50167";
room9.identifier = "6155870e-6635-4408-b44c-500015fd9907";
room9.users = null;
const room10 = new Room();
room10.id = "9342fa41-7064-48d6-b308-427f40d106f2";
room10.identifier = "1bca70ef-3cff-425c-8443-6e94a6310f94";
room10.users = null;

const user1 = new User();
user1.id = "792c77c4-d753-495e-bfc7-a148541dec8c";
user1.name = "user1";
user1.room = null;
user1.socketId = "e5fa995d-007c-45e7-b222-25b1b70c3f45";
const user2 = new User();
user2.id = "84142c4f-de58-45e1-90ce-d698501a9caa";
user2.name = "user2";
user2.room = null;
user2.socketId = "1ef4a0ba-fc89-4e80-8d47-af1e86b4eb26";
const user3 = new User();
user3.id = "7c951e86-c12a-4501-93c2-9afa1039a045";
user3.name = "user3";
user3.room = null;
user3.socketId = "8e2282e9-ba85-48a7-8232-ea5901434b46";
const user4 = new User();
user4.id = "75128894-c099-40d1-8c0d-e4e2091a9f3f";
user4.name = "user4";
user4.room = null;
user4.socketId = "a675e7d2-70bf-47e1-8312-d93c3fcb6e55";
const user5 = new User();
user5.id = "32120e54-c42b-4e42-a3df-065cefa79aec";
user5.name = "user5";
user5.room = null;
user5.socketId = "53db6536-362d-4e51-a617-a6de94362681";
const user6 = new User();
user6.id = "faec27ad-cb95-407c-ab6b-c4791f5d014a";
user6.name = "user6";
user6.room = null;
user6.socketId = "84fd6419-1003-4c52-80f0-3f1ca4eedcd4";
const user7 = new User();
user7.id = "5692d371-7996-49b9-b13d-94a93dcf1abc";
user7.name = "user7";
user7.room = null;
user7.socketId = "c9ba0aac-e8f5-4d86-8a0f-fbda71fab363";
const user8 = new User();
user8.id = "cbd84108-ccc9-4120-b526-07c47bf59c3d";
user8.name = "user8";
user8.room = null;
user8.socketId = "ca05ea1d-bb5e-46db-a959-6c02d3c4ffc8";
const user9 = new User();
user9.id = "5db719c2-5b5e-4fc3-ad49-866a5d93ec36";

user9.name = "user9";
user9.room = null;
user9.socketId = "9e215a04-b3ee-40f4-919d-1e86aa6b4546";
const user10 = new User();
user10.id = "db98fe32-ce41-449f-a147-a93bf298bdde";
user10.name = "user10";
user10.room = null;
user10.socketId = "8a31a4d7-3b11-4039-9f24-a661223f9fac";

message1.room = room1;
message2.room = room2;
message3.room = room3;
message4.room = room4;
message5.room = room5;
message6.room = room6;
message7.room = room7;
message8.room = room8;
message9.room = room9;
message10.room = room10;

message1.user = user1;
message2.user = user2;
message3.user = user3;
message4.user = user4;
message5.user = user5;
message6.user = user6;
message7.user = user7;
message8.user = user8;
message9.user = user9;
message10.user = user10;

room1.messages = [message1];
room2.messages = [message2];
room3.messages = [message3];
room4.messages = [message4];
room5.messages = [message5];
room6.messages = [message6];
room7.messages = [message7];
room8.messages = [message8];
room9.messages = [message9];
room10.messages = [message10];

user1.messages = [message1];
user2.messages = [message2];
user3.messages = [message3];
user4.messages = [message4];
user5.messages = [message5];
user6.messages = [message6];
user7.messages = [message7];
user8.messages = [message8];
user9.messages = [message9];
user10.messages = [message10];
user1.room = room1;

const messages = [
  message1,
  message2,
  message3,
  message4,
  message5,
  message6,
  message7,
  message8,
  message9,
  message10,
];

const rooms = [
  room1,
  room2,
  room3,
  room4,
  room5,
  room6,
  room7,
  room8,
  room9,
  room10,
];

const users = [
  user1,
  user2,
  user3,
  user4,
  user5,
  user6,
  user7,
  user8,
  user9,
  user10,
];

export { messages, rooms, users };
