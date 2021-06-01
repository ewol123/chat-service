import { MockMessageRepository } from "../lib/MockMessageRepository";
import { Message } from "../../core/models/Message";
import { assert, expect } from "chai";
import { messages } from "../lib/dataProvider";

describe("MessageRepository", () => {
  const messageRepository = new MockMessageRepository();
  it("should create MessageRepository instance", (done) => {
    assert.instanceOf(messageRepository, MockMessageRepository);
    done();
  });
  describe("findById", async () => {
    it("should return Message instance", async () => {
      const res = await messageRepository.findById(
        "b8beb1be-02f8-4b20-9005-6d0c419d6480"
      );
      assert.instanceOf(res, Message);
      return Promise.resolve();
    });
    it("should return a Message with correct values", async () => {
      const res = await messageRepository.findById(
        "b8beb1be-02f8-4b20-9005-6d0c419d6480"
      );
      assert.deepEqual(res, messages[0]);
      return Promise.resolve();
    });
    it("should not return a Message", async () => {
      const res = await messageRepository.findById("123");
      assert.isUndefined(res);
      return Promise.resolve();
    });
  });
  describe("findAllByRoomId", async () => {
    it("should return Message[] instance", async () => {
      const res = await messageRepository.findAllByRoomId(
        "ff2f974b-43ff-4644-957f-8ac1c434efc8"
      );
      res.forEach((r) => {
        assert.instanceOf(r, Message);
      });
      return Promise.resolve();
    });
    it("should return a Message[] with correct values", async () => {
      const res = await messageRepository.findAllByRoomId(
        "ff2f974b-43ff-4644-957f-8ac1c434efc8"
      );
      expect(res).to.be.an("array");
      return Promise.resolve();
    });
    it("should not return a Message[]", async () => {
      const res = await messageRepository.findAllByRoomId("123");
      expect(res).to.be.an("array");
      expect(res).to.have.length(0)
      return Promise.resolve();
    });
  });
  describe("findAll", async () => {
    it("should return Message[] instance", async () => {
      const res = await messageRepository.findAll();
      res.forEach((r) => {
        assert.instanceOf(r, Message);
      });
      return Promise.resolve();
    });
    it("should return a Message[] with correct values", async () => {
      const res = await messageRepository.findAll();

      assert.deepEqual(res, messages);
      return Promise.resolve();
    });
  });
  describe("save", async () => {
    it("should save a new Message", async () => {
      const message = new Message();
      message.id = "8c0386ab-6d65-4537-825c-ad615eebc9b7";
      message.stamp = new Date();
      message.text = "hello";
      const res = await messageRepository.save(message);

      const ref = await messageRepository.findById(
        "8c0386ab-6d65-4537-825c-ad615eebc9b7"
      );

      assert.equal(ref, message);

      return Promise.resolve();
    });
  });
  describe("remove", async () => {
    it("should delete a Message", async () => {
      const message = new Message();
      message.id = "28a993a1-e4f1-4595-bb9b-50cedbc9bd02";
      message.stamp = new Date();
      message.text = "hello";
      const res = await messageRepository.save(message);

      await messageRepository.remove(message);

      const ref = await messageRepository.findById(
        "28a993a1-e4f1-4595-bb9b-50cedbc9bd02"
      );

      assert.isUndefined(ref);

      return Promise.resolve();
    });
  });
});
