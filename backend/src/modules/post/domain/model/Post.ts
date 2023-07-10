import { Category } from "../../../category/domain/model/Category"
import { PostTitle } from "./PostTitle"
import { User } from "../../../user/domain/model/User"

interface createProps {
  id?: number
  title?: string
  content?: string
  createdAt?: Date
  updatedAt?: Date
  userId?: number
  user?: User
  categories?: Category[]
  numComments?: number
  point?: number
  like?: Boolean
}

export class Post {
  id: number
  title: PostTitle
  content: string
  createdAt: Date
  updatedAt: Date
  userId: number
  user: User
  categories: Category[]
  numComments: number
  point: number
  like: Boolean

  private constructor(init?: Partial<Post>) {
    Object.assign(this, init)
  }

  static create(props: createProps) {
    const { title, ...rest } = props
    return new Post({ ...rest, title: PostTitle.create(title) })
  }

  update(props: createProps) {
    const { title, content, categories } = props
    this.title = PostTitle.create(title)
    this.content = content
    this.categories = categories ?? []
    this.updatedAt = new Date()
  }
}
