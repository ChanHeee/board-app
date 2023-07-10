import { DataSource } from "typeorm"
import { CategoryEntity } from "../modules/category/infrastructure/CategoryEntity"
import { PostEntity } from "../modules/post/infrastructure/PostEntity"
import { UserEntity } from "../modules/user/infrastructure/UserEntity"
import { CommentEntity } from "../modules/comment/infrastructure/CommentEntity"
import { PostVoteEntity } from "../modules/post/infrastructure/PostVoteEntity"
import { CommentVoteEntity } from "../modules/comment/infrastructure/CommentVoteEntity"

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "board-app",
  synchronize: true,
  logging: false,
  entities: [
    PostEntity,
    CategoryEntity,
    UserEntity,
    CommentEntity,
    PostVoteEntity,
    CommentVoteEntity,
  ],
  migrations: [],
  subscribers: [],
  timezone: "local",
})
