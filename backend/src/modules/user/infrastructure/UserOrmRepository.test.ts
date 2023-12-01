import AppDataSource from "../../../config/DbConfig"
import { User } from "../domain/model/User"
import { UserPassword } from "../domain/model/UserPassword"
import { UserOrmRepository } from "./UserOrmRepository"

describe("UserOrmRepository", () => {
  let sut: UserOrmRepository
  let newUserId: number

  beforeEach(async () => {
    await AppDataSource.initialize()
    sut = new UserOrmRepository(AppDataSource)
  })

  afterEach(async () => AppDataSource.destroy())

  describe("save()", () => {
    it("it should return User when successfully saved", async () => {
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
      newUserId = savedUser.id

      //assert
      expect(savedUser.email).toEqual(email)
      expect(savedUser.username).toEqual(username)
      expect(savedUser.comparePassword(password)).toBeTruthy()
    })
  })

  describe("findById()", () => {
    it("it should return User if exist", async () => {
      //arrange
      const id = 1

      //act
      const user = await sut.findById(id)

      //assert
      expect(user.email).toEqual("user1@gmail.com")
    })
    it("it should return null if not exist", async () => {
      //arrange
      const id = 10101010

      //act
      const user = await sut.findById(id)

      //assert
      expect(user).toBeNull()
    })
  })

  describe("findByEmail()", () => {
    it("it should return User if exist", async () => {
      //arrange
      const email = "user1@gmail.com"

      //act
      const user = await sut.findByEmail(email)

      //assert
      expect(user.username).toEqual("user1")
    })
    it("it should return null if not exist", async () => {
      //arrange
      const email = "none"

      //act
      const user = await sut.findByEmail(email)

      //assert
      expect(user).toBeNull()
    })
  })

  describe("findByUserName()", () => {
    it("it should return User if exist", async () => {
      //arrange
      const username = "user1"

      //act
      const user = await sut.findByUserName(username)

      //assert
      expect(user.email).toEqual("user1@gmail.com")
    })
    it("it should return null if not exist", async () => {
      //arrange
      const username = "none"

      //act
      const user = await sut.findByUserName(username)

      //assert
      expect(user).toBeNull()
    })
  })

  describe("delete()", () => {
    it("it should return True when successfully deleted", async () => {
      //arrange
      const id = newUserId

      //act
      const result = await sut.delete(id)

      //assert
      expect(result).toBeTruthy()
    })
    it("it should return When when user with id doesn't exist", async () => {
      //arrange
      const id = 123123

      //act
      const result = await sut.delete(id)

      //assert
      expect(result).toBeFalsy()
    })
  })
})
