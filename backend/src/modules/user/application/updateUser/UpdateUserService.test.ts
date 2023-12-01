import { Conflict } from "../../../../shared/util/exceptions"

import { UpdateUserService } from "./UpdateUserService"
import { mock, mockClear } from "jest-mock-extended"
import { UserRepository } from "../../domain/repository/UserRepository"
import { User } from "../../domain/model/User"
describe("UpdateUserService", () => {
  let sut: UpdateUserService
  const mockedUserRepository = mock<UserRepository>()

  beforeEach(() => {
    sut = new UpdateUserService(mockedUserRepository)
    mockClear(mockedUserRepository)
  })
  it("it should return updated user when successfully updated", async () => {
    //arrange
    const id = 1
    const email = "user@gmail.com"
    const username = "user"
    const password = "password"
    const user = User.create({ id, email, username, password })
    mockedUserRepository.findById.mockResolvedValueOnce(user)
    mockedUserRepository.save.mockResolvedValueOnce(user)

    //act
    const result = await sut.execute({ id, username, password })

    //assert
    expect(result.username).toEqual(username)
  })
})
