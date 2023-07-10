import { EditPasswordService } from "./EditPasswordService"
import { EditPasswordRequest } from "./EditPasswordRequest"
import { mock, mockClear } from "jest-mock-extended"
import { UserRepository } from "../../domain/repository/UserRepository"
import { User } from "../../domain/model/User"
import { UserPassword } from "../../domain/model/UserPassword"
describe("EditPasswordService", () => {
  let sut: EditPasswordService
  const mockedUserRepository = mock<UserRepository>()

  beforeEach(() => {
    sut = new EditPasswordService(mockedUserRepository)
    mockClear(mockedUserRepository)
  })
  it("it should return user with new password", async () => {
    //arrange
    const password = "qwf123!!"
    const newPassword = "qwf123!!!"
    mockedUserRepository.findById.mockResolvedValueOnce(
      new User({ password: UserPassword.create(password) })
    )
    mockedUserRepository.save.mockResolvedValueOnce(
      new User({ password: UserPassword.create(newPassword) })
    )

    //act
    const user = await sut.execute(
      new EditPasswordRequest({ id: 1, password, newPassword })
    )

    //assert
    expect(user.comparePassword(newPassword)).toBeTruthy()
  })
})
