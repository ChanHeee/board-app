import { User } from "../../../user/domain/model/User"
import { Post } from "../../domain/model/Post"
import { injectable, inject } from "inversify"
import Types from "../../../../config/Types"
import { PostRepository } from "../../domain/repository/PostRepository"
import { CategoryRepository } from "../../../category/domain/repository/CategoryRepository"
import { CreatePostRequest } from "./CreatePostRequest"
import { DataSource } from "typeorm"
import { PostResponse } from "../PostResponse"
import { PostEntity } from "../../infrastructure/PostEntity"
import { Category } from "../../../category/domain/model/Category"
import { CategoryEntity } from "../../../category/infrastructure/CategoryEntity"

@injectable()
export class CreatePostService {
  constructor(
    @inject(Types.PostRepository)
    private postRepository: PostRepository,
    @inject(Types.CategoryRepository)
    private categoryRepository: CategoryRepository,
    @inject(Types.AppDataSource) private dataSource: DataSource
  ) {}

  async execute(dto: CreatePostRequest): Promise<PostResponse> {
    const queryRunner = this.dataSource.createQueryRunner()
    await queryRunner.startTransaction()

    const { title, content, userId, categories } = dto

    const post = Post.create({ title, content, userId })

    let newPost: Post

    try {
      post.categories = await this.categoryRepository.save(
        categories,
        queryRunner.manager
      )
      newPost = await this.postRepository.save(post, queryRunner.manager)

      await queryRunner.commitTransaction()
      return PostResponse.of(newPost)
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error
    } finally {
      await queryRunner.release()
    }
  }
}
