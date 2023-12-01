import { injectable, inject } from "inversify"
import Types from "../../../../config/Types"
import { PostRepository } from "../../domain/repository/PostRepository"
import { GetManyPostsResponse } from "./GetManyPostsResponse"
import { PostResponse } from "../PostResponse"
import { Post } from "../../domain/model/Post"
import { GetManyPostsRequest } from "./GetManyPostsRequest"
@injectable()
export class GetManyPostsService {
  constructor(
    @inject(Types.PostRepository)
    private postRepository: PostRepository
  ) {}

  async execute(dto: GetManyPostsRequest): Promise<GetManyPostsResponse> {
    const { skip, take, order, category, user, me } = dto
    let posts, total
    if (category) {
      ;[posts, total] = await this.postRepository.findPostsByCategory(
        skip,
        take,
        category,
        me
      )
    } else if (user) {
      ;[posts, total] = await this.postRepository.findPostsByUsername(
        skip,
        take,
        user,
        me
      )
    } else {
      ;[posts, total] = await this.postRepository.findPosts(
        skip,
        take,
        order,
        me
      )
    }

    return GetManyPostsResponse.of(posts, total, skip)
  }
}
