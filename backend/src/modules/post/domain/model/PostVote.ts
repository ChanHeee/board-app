export class PostVote {
  id: number
  postId: number
  userId: number
  value: 1 | -1

  private constructor(init?: Partial<PostVote>) {
    Object.assign(this, init)
  }

  static create(props: Partial<PostVote>) {
    return new PostVote(props)
  }
}
