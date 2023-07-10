import { injectable, inject } from "inversify"
import Types from "../../../../config/Types"
import { PostRepository } from "../../domain/repository/PostRepository"
import { NotFound } from "../../../../shared/util/exceptions"

@injectable()
export class DeletePostService {
  constructor(
    @inject(Types.PostRepository)
    private postRepository: PostRepository
  ) {}

  async execute(id: number) {
    const result = await this.postRepository.delete(id)
    if (!result) {
      throw new NotFound(`Couldn't find a post by id {${id}}.`)
    }
    return result
  }
}
