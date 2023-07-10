import { Conflict } from "../../../../shared/util/exceptions"

import { DeleteUserService } from "./DeleteUserService"
import { mock, mockClear } from "jest-mock-extended"
import { UserRepository } from "../../domain/repository/UserRepository"
describe("DeleteUserService", () => {
  let sut: DeleteUserService
  const mockedUserRepository = mock<UserRepository>()

  beforeEach(() => {
    sut = new DeleteUserService(mockedUserRepository)
    mockClear(mockedUserRepository)
  })
  it("it should return true when successfully deleted", async () => {
    //arrange
    mockedUserRepository.delete.mockResolvedValueOnce(true)

    //act
    const result = await sut.execute(1)

    //assert
    expect(result).toBeTruthy()
  })

  it("it should return false when fail to delete", async () => {
    //arrange
    mockedUserRepository.delete.mockResolvedValueOnce(false)

    //act
    const result = await sut.execute(2)

    //assert
    expect(result).toBeFalsy()
  })
})
