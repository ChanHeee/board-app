import { Comment } from "../model/Comment"
export interface CommentRepository {
  save(comment: Comment): Promise<Comment>
  editText(id: number, text: string): Promise<Boolean>
  findById(id: number): Promise<Comment>
  findParentByPostId(
    id: number,
    skip: number,
    take: number,
    me?: number
  ): Promise<[Comment[], number]>
  findChildByPostId(
    id: number,
    skip: number,
    take: number,
    me?: number
  ): Promise<[Comment[], number]>
  countParentByPostId(id: number): Promise<number>
}
