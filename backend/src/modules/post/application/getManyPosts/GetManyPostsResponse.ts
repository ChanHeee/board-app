import { Post } from "../../domain/model/Post"
import { PostResponse } from "../PostResponse"
export class GetManyPostsResponse {
  posts: PostResponse[]
  total: number
  take: number
  skip: number

  static of(posts: Post[], total: number, skip: number) {
    return {
      posts: posts.map((post) => PostResponse.of(post)),
      total,
      skip,
      take: posts.length,
    }
  }
}
