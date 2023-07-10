import { Post } from "../model/Post"
import { EntityManager } from "typeorm"
export interface PostRepository {
  save(post: Post, transaction?: any): Promise<Post>
  findById(id: number, me?: number): Promise<Post>
  findWithUserId(id: number, userId?: number): Promise<Post>
  findPosts(
    skip: number,
    take: number,
    order: string,
    me?: number
  ): Promise<[Post[], number]>
  findPostsByCategory(
    skip: number,
    take: number,
    category: string,
    me?: number
  ): Promise<[Post[], number]>
  findPostsByUsername(
    skip: number,
    take: number,
    username: string,
    me?: number
  ): Promise<[Post[], number]>
  delete(id: number): Promise<Boolean>
  temp(id: number): Promise<Post>
}
