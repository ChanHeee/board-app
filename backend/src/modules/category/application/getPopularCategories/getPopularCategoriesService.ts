import { inject, injectable } from "inversify"
import Types from "../../../../config/Types"
import { CategoryRepository } from "../../domain/repository/CategoryRepository"

@injectable()
export class GetPopularCategoriesService {
  constructor(
    @inject(Types.CategoryRepository)
    private categoryRepository: CategoryRepository
  ) {}

  async excute() {
    return await this.categoryRepository.findOrderByCount(10)
  }
}
