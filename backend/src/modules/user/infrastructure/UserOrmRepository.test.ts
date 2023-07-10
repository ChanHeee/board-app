import { TestDataSource } from "../../../config/DbConfig"
import { User } from "../domain/model/User"
import { UserPassword } from "../domain/model/UserPassword"
import { UserOrmRepository } from "./UserOrmRepository"

describe("UserOrmRepository", () => {
  let sut: UserOrmRepository

  beforeEach(async () => {
    await TestDataSource.initialize()
    sut = new UserOrmRepository(TestDataSource)
  })

  afterEach(async () => TestDataSource.destroy())

  describe("save()", () => {
    it("it should return new User", async () => {
      //arrange
      const email = "new@gmail.com"
      const username = "new"
      const password = "password"
      const user = User.create({
        email,
        username,
        password,
      })

      //act
      const savedUser = await sut.save(user)

      //assert
      expect(savedUser.email).toEqual(email)
      expect(savedUser.username).toEqual(username)
      expect(savedUser.comparePassword(password)).toBeTruthy()
    })

    it("it should return new User", async () => {
      //arrange
      const email = "new@gmail.com"
      const username = "new"
      const password = "password"
      const user = User.create({
        email,
        username,
        password,
      })

      //act
      const savedUser = await sut.save(user)

      //assert
      expect(savedUser.email).toEqual(email)
      expect(savedUser.username).toEqual(username)
      expect(savedUser.comparePassword(password)).toBeTruthy()
    })
  })
})
