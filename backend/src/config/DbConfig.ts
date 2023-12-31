import { DataSource } from "typeorm"
import { CategoryEntity } from "../modules/category/infrastructure/CategoryEntity"
import { PostEntity } from "../modules/post/infrastructure/PostEntity"
import { UserEntity } from "../modules/user/infrastructure/UserEntity"
import { CommentEntity } from "../modules/comment/infrastructure/CommentEntity"
import { PostVoteEntity } from "../modules/post/infrastructure/PostVoteEntity"
import { CommentVoteEntity } from "../modules/comment/infrastructure/CommentVoteEntity"

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: 3306,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: [
    PostEntity,
    CategoryEntity,
    UserEntity,
    CommentEntity,
    PostVoteEntity,
    CommentVoteEntity,
  ],
  migrations: [__dirname + "/../../migration/*.ts"],
  subscribers: [],
  timezone: "local",
})

export default AppDataSource
