import { MockUserRepository } from "../lib/MockUserRepository";
import { User } from "../../core/models/User";
import { assert, expect } from "chai";
import { users } from "../lib/dataProvider";

describe("userRepository", () => {
  const userRepository = new MockUserRepository();
  it("should create UserRepository instance", (done) => {
    assert.instanceOf(userRepository, MockUserRepository);
    done();
  });
  describe("findById", async () => {
    it("should return User instance", async () => {
      const res = await userRepository.findById(
        "792c77c4-d753-495e-bfc7-a148541dec8c"
      );
      assert.instanceOf(res, User);
      return Promise.resolve();
    });
    it("should return a User with correct values", async () => {
      const res = await userRepository.findById(
        "792c77c4-d753-495e-bfc7-a148541dec8c"
      );
      assert.deepEqual(res, users[0]);
      return Promise.resolve();
    });
    it("should not return a User", async () => {
      const res = await userRepository.findById("123");
      assert.isUndefined(res);
      return Promise.resolve();
    });
  });
  describe("findBySocketId", async () => {
    it("should return User instance", async () => {
      const res = await userRepository.findBySocketId(
        "e5fa995d-007c-45e7-b222-25b1b70c3f45"
      );
      assert.instanceOf(res, User);
      return Promise.resolve();
    });
    it("should return a User with correct values", async () => {
      const res = await userRepository.findBySocketId(
        "e5fa995d-007c-45e7-b222-25b1b70c3f45"
      );
      assert.deepEqual(res, users[0]);
      return Promise.resolve();
    });
    it("should not return a User", async () => {
      const res = await userRepository.findBySocketId("123");
      assert.isUndefined(res);
      return Promise.resolve();
    });
  });
  describe("findRoomOfUserById", async () => {
    it("should return User instance", async () => {
      const res = await userRepository.findRoomOfUserById(
        "792c77c4-d753-495e-bfc7-a148541dec8c"
      );
      assert.instanceOf(res, User);
      return Promise.resolve();
    });
    it("should return a User with correct values", async () => {
      const res = await userRepository.findRoomOfUserById(
        "792c77c4-d753-495e-bfc7-a148541dec8c"
      );
      assert.deepEqual(res, users[0]);
      return Promise.resolve();
    });
    it("should not return a User", async () => {
      const res = await userRepository.findRoomOfUserById("123");
      assert.isUndefined(res);
      return Promise.resolve();
    });
  });
  describe("findRoomOfUserBySocketId", async () => {
    it("should return User instance", async () => {
      const res = await userRepository.findRoomOfUserBySocketId(
        "e5fa995d-007c-45e7-b222-25b1b70c3f45"
      );
      assert.instanceOf(res, User);
      return Promise.resolve();
    });
    it("should return a User with correct values", async () => {
      const res = await userRepository.findRoomOfUserBySocketId(
        "e5fa995d-007c-45e7-b222-25b1b70c3f45"
      );
      assert.deepEqual(res, users[0]);
      return Promise.resolve();
    });
    it("should not return a User", async () => {
      const res = await userRepository.findRoomOfUserBySocketId("123");
      assert.isUndefined(res);
      return Promise.resolve();
    });
  });

  describe("findAllByRoomId", async () => {
    it("should return User[] instance", async () => {
      const res = await userRepository.findAllByRoomId(
        "ff2f974b-43ff-4644-957f-8ac1c434efc8"
      );
      res.forEach((r) => {
        assert.instanceOf(r, User);
      });
      return Promise.resolve();
    });
    it("should return a User[] with correct values", async () => {
      const res = await userRepository.findAllByRoomId(
        "ff2f974b-43ff-4644-957f-8ac1c434efc8"
      );

      expect(res).to.be.an("array");
      return Promise.resolve();
    });
    it("should return a empty array with incorrect id", async () => {
      const res = await userRepository.findAllByRoomId(
        "affd35-43ff-4644-957f-3434535"
      );

      expect(res).to.be.an("array");
      expect(res).to.have.length(0);
      return Promise.resolve();
    });
  });

  describe("findAll", async () => {
    it("should return User[] instance", async () => {
      const res = await userRepository.findAll();
      res.forEach((r) => {
        assert.instanceOf(r, User);
      });
      return Promise.resolve();
    });
    it("should return a User[] with correct values", async () => {
      const res = await userRepository.findAll();

      assert.deepEqual(res, users);
      return Promise.resolve();
    });
  });
  describe("save", async () => {
    it("should save a new User", async () => {
      const user = new User();
      user.id = "59104828-b79c-430e-aabe-29815bcf08ea";
      user.name = "test user";
      user.socketId = "2e84f543-1104-446e-b780-ef16f661d35b";

      const res = await userRepository.save(user);

      const ref = await userRepository.findById(
        "59104828-b79c-430e-aabe-29815bcf08ea"
      );

      assert.equal(ref, user);

      return Promise.resolve();
    });
  });
  describe("remove", async () => {
    it("should delete a User", async () => {
      const user = new User();
      user.id = "bc87cb08-5e06-4c38-948b-f0bf7528458b";
      user.socketId = "9eb1cbc8-b482-46fc-9f3e-bf4c423456f0";
      const res = await userRepository.save(user);

      await userRepository.remove(user);

      const ref = await userRepository.findById(
        "bc87cb08-5e06-4c38-948b-f0bf7528458b"
      );

      assert.isUndefined(ref);

      return Promise.resolve();
    });
  });
});
