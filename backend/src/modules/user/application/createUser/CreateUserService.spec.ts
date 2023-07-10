import { CreateUserService } from "./CreateUserService"
import { mock, mockClear } from "jest-mock-extended"
import { User } from "../../domain/model/User"
import { UserRepository } from "../../domain/repository/UserRepository"
import { UserPassword } from "../../domain/model/UserPassword"
import { CreateUserRequest } from "./CreateUserRequest"
import { Conflict } from "../../../../shared/util/exceptions"

describe("CreateUserService", () => {
  let sut: CreateUserService
  const mockedUserRepository = mock<UserRepository>()

  beforeEach(() => {
    sut = new CreateUserService(mockedUserRepository)
    mockClear(mockedUserRepository)
  })
  it("it should return new User", async () => {
    //arrange
    const email = "new@example.com"
    const username = "new"
    const password = "password"
    const dto = new CreateUserRequest({ email, username, password })
    mockedUserRepository.save.mockResolvedValueOnce(
      User.create({ email, username, password })
    )

    //act
    const user = await sut.execute(dto)

    //assert
    expect(user.email).toEqual(email)
    expect(user.username).toEqual(username)
  })

  it("it should throw Conflict Error when email is already used", async () => {
    const email = "new@example.com"
    const username = "new"
    const password = "password"
    const dto = new CreateUserRequest({ email, username, password })
    mockedUserRepository.findByEmail.mockResolvedValueOnce(new User())

    //act & assert
    await expect(async () => {
      await sut.execute(dto)
    }).rejects.toThrowError(
      new Conflict(`Email {${email}} is already registered.`)
    )
  })

  it("it should throw Conflict Error when username is already used", async () => {
    const email = "new@example.com"
    const username = "new"
    const password = "password"
    const dto = new CreateUserRequest({ email, username, password })
    mockedUserRepository.findByUserName.mockResolvedValueOnce(new User())

    //act & assert
    await expect(async () => {
      await sut.execute(dto)
    }).rejects.toThrowError(
      new Conflict(`username {${username}} is already taken.`)
    )
  })
})
