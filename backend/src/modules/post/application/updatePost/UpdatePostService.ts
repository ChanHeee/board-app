import { injectable, inject } from "inversify"
import { PostRepository } from "../../domain/repository/PostRepository"
import { CategoryRepository } from "../../../category/domain/repository/CategoryRepository"
import Types from "../../../../config/Types"
import { NotFound, BadRequest } from "../../../../shared/util/exceptions"
import { PostTitle } from "../../domain/model/PostTitle"
import { UpdatePostRequest } from "./UpdatePostRequest"
import { PostResponse } from "../PostResponse"

@injectable()
export class UpdatePostService {
  constructor(
    @inject(Types.PostRepository)
    private postRepository: PostRepository,
    @inject(Types.CategoryRepository)
    private categoryRepository: CategoryRepository
  ) {}

  async execute(dto: UpdatePostRequest): Promise<PostResponse> {
    const { id, userId, title, content, categories } = dto

    let post = await this.postRepository.findWithUserId(id, userId)
    if (!post) {
      throw new NotFound(`Couldn't find a post by id: [${id}].`)
    }

    const newCategories = await this.categoryRepository.save(categories)
    post.update({ title, content, categories: newCategories })

    const result = await this.postRepository.save(post)
    return PostResponse.of(result)
  }
}
