export class CommentVote {
  id: number
  commentId: number
  userId: number
  value: 1 | -1

  private constructor(init?: Partial<CommentVote>) {
    Object.assign(this, init)
  }

  static create(props: Partial<CommentVote>) {
    return new CommentVote(props)
  }
}
