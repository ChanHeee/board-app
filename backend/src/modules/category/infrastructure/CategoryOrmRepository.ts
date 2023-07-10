import { injectable, inject } from "inversify"
import { Repository, DataSource, In, EntityManager } from "typeorm"

import { CategoryEntity } from "./CategoryEntity"
import { CategoryRepository } from "../domain/repository/CategoryRepository"
import Types from "../../../config/Types"
import { Category } from "../domain/model/Category"
import { PostEntity } from "../../post/infrastructure/PostEntity"

@injectable()
export class CategoryOrmRepository implements CategoryRepository {
  private readonly repository: Repository<CategoryEntity>

  constructor(@inject(Types.AppDataSource) private dataSource: DataSource) {
    this.repository = dataSource.getRepository(CategoryEntity)
  }

  async save(
    categories: string[],
    transaction?: EntityManager
  ): Promise<Category[]> {
    if (!categories) {
      return null
    }

    let existCategories: CategoryEntity[]
    let newCategories: CategoryEntity[]

    if (transaction) {
      existCategories = await transaction.find(CategoryEntity, {
        where: { name: In(categories) },
      })

      const existName = existCategories.map((item) => item.name)
      const newName = categories
        .filter((name) => !existName.includes(name))
        .map((name) => new CategoryEntity({ name }))

      newCategories = await transaction.save(newName)
    } else {
      existCategories = await this.repository.find({
        where: { name: In(categories) },
      })

      const existName = existCategories.map((item) => item.name)
      const newName = categories
        .filter((name) => !existName.includes(name))
        .map((name) => new CategoryEntity({ name }))

      newCategories = await this.repository.save(newName)
    }

    return [].concat(
      existCategories.map((category) => category.toDomain()),
      newCategories.map((category) => category.toDomain())
    )
  }

  async findOrderByCount(take: number): Promise<string[]> {
    const result = await this.dataSource.manager.query(
      `
      SELECT c.name, COUNT(c.name) count
      FROM category c, post_to_category pc
      WHERE c.id = pc.categoryId
      GROUP BY c.name
      ORDER BY count DESC
      LIMIT ?;
    `,
      [take]
    )

    return result
  }

  async delete(name: string): Promise<Boolean> {
    const { affected } = await this.repository.delete({ name })
    return !!affected
  }
}
