import { injectable, inject } from "inversify"
import Types from "../../../../config/Types"
import { PostRepository } from "../../domain/repository/PostRepository"
import { NotFound } from "../../../../shared/util/exceptions"
import { PostResponse } from "../PostResponse"

@injectable()
export class GetPostService {
  constructor(
    @inject(Types.PostRepository)
    private postRepository: PostRepository
  ) {}

  async execute(id: number, me?: number): Promise<PostResponse> {
    const post = await this.postRepository.findById(id, me)

    if (!post) {
      throw new NotFound(`Couldn't find a post by id {${id}}.`)
    }
    return PostResponse.of(post)
  }
}
