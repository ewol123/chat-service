import { MockRoomRepository } from "../lib/MockRoomRepository";
import { Room } from "../../domain/models/Room";
import { assert, expect } from "chai";
import { rooms } from "../lib/dataProvider";

describe("RoomRepository", () => {
  const roomRepository = new MockRoomRepository();
  it("should create RoomRepository instance", (done) => {
    assert.instanceOf(roomRepository, MockRoomRepository);
    done();
  });
  describe("findById", async () => {
    it("should return Room instance", async () => {
      const res = await roomRepository.findById(
        "ff2f974b-43ff-4644-957f-8ac1c434efc8"
      );
      assert.instanceOf(res, Room);
      return Promise.resolve();
    });
    it("should return a Room with correct values", async () => {
      const res = await roomRepository.findById(
        "ff2f974b-43ff-4644-957f-8ac1c434efc8"
      );
      assert.deepEqual(res, rooms[0]);
      return Promise.resolve();
    });
    it("should not return a Room", async () => {
      const res = await roomRepository.findById("123");
      assert.isUndefined(res);
      return Promise.resolve();
    });
  });
  describe("findByIdentifier", async () => {
    it("should return Room instance", async () => {
      const res = await roomRepository.findByIdentifier(
        "ac94782d-dadc-49cd-bb33-9fcf215a3e61"
      );
      assert.instanceOf(res, Room);
      return Promise.resolve();
    });
    it("should return a Room with correct values", async () => {
      const res = await roomRepository.findByIdentifier(
        "ac94782d-dadc-49cd-bb33-9fcf215a3e61"
      );
      assert.deepEqual(res, rooms[0]);
      return Promise.resolve();
    });
    it("should not return a Room", async () => {
      const res = await roomRepository.findByIdentifier("123");
      assert.isUndefined(res);
      return Promise.resolve();
    });
  });
  describe("findAll", async () => {
    it("should return Room[] instance", async () => {
      const res = await roomRepository.findAll();
      res.forEach((r) => {
        assert.instanceOf(r, Room);
      });
      return Promise.resolve();
    });
    it("should return a Room[] with correct values", async () => {
      const res = await roomRepository.findAll();

      assert.deepEqual(res, rooms);
      return Promise.resolve();
    });
  });
  describe("save", async () => {
    it("should save a new Room", async () => {
      const room = new Room();
      room.id = "1d4e0767-46bf-465f-8017-da18039cadc6";
      room.identifier = "a54f3528-1464-46c8-929d-b947911d87fb";

      const res = await roomRepository.save(room);

      const ref = await roomRepository.findById(
        "1d4e0767-46bf-465f-8017-da18039cadc6"
      );

      assert.equal(ref, room);

      return Promise.resolve();
    });
  });
  describe("remove", async () => {
    it("should delete a Room", async () => {
      const room = new Room();
      room.id = "195a0aab-a672-4f34-8ab7-228b16f87f40";
      room.identifier = "7bc0ce41-61e7-4d0f-83fa-d69adc601da2";
      const res = await roomRepository.save(room);

      await roomRepository.remove(room);

      const ref = await roomRepository.findById(
        "195a0aab-a672-4f34-8ab7-228b16f87f40"
      );

      assert.isUndefined(ref);

      return Promise.resolve();
    });
  });
});
