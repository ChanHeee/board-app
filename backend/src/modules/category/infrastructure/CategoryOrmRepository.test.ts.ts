import AppDataSource from "../../../config/DbConfig"
import { CategoryOrmRepository } from "./CategoryOrmRepository"

describe("CategoryOrmRepository", () => {
  let sut: CategoryOrmRepository

  beforeEach(async () => {
    await AppDataSource.initialize()
    sut = new CategoryOrmRepository(AppDataSource)
  })

  afterEach(async () => AppDataSource.destroy())

  describe("save()", () => {
    it("it should return array of Category", async () => {
      //act
      const result = await sut.save(["new", "test"])

      //assert
      expect(result.map((item) => item.name)).toEqual(["new", "test"])
    })
  })
})
