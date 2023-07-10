import { PostEntity } from "./src/modules/post/infrastructure/PostEntity"
import { CategoryEntity } from "./src/modules/category/infrastructure/CategoryEntity"
import { UserEntity } from "./src/modules/user/infrastructure/UserEntity"
import { CommentEntity } from "./src/modules/comment/infrastructure/CommentEntity"
import { PostVoteEntity } from "./src/modules/post/infrastructure/PostVoteEntity"
import { CommentVoteEntity } from "./src/modules/comment/infrastructure/CommentVoteEntity"
module.exports = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: "root",
  password: "chan2461",
  database: "board-app",
  entities: [
    PostEntity,
    CategoryEntity,
    UserEntity,
    CommentEntity,
    PostVoteEntity,
    CommentVoteEntity,
  ],
  seeds: ["src/seed/seed.ts"],
  factories: ["src/seed/factory/*.ts"],
}
