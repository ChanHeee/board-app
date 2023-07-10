import { Factory, Seeder } from "typeorm-seeding"
import { Connection } from "typeorm"
import { UserEntity } from "../modules/user/infrastructure/UserEntity"
import { PostEntity } from "../modules/post/infrastructure/PostEntity"
import { CategoryEntity } from "../modules/category/infrastructure/CategoryEntity"
import { CommentEntity } from "../modules/comment/infrastructure/CommentEntity"
import { User } from "../modules/user/domain/model/User"
import { UserPassword } from "../modules/user/domain/model/UserPassword"
import { PostVoteEntity } from "../modules/post/infrastructure/PostVoteEntity"
import { CommentVoteEntity } from "../modules/comment/infrastructure/CommentVoteEntity"

export default class InitialDatabaseSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const userRepository = await connection.getRepository(UserEntity)
    const users = await userRepository.save([
      UserEntity.create({
        id: 1,
        email: "user1@gmail.com",
        username: "user1",
        password: UserPassword.create("qwf123!!").value,
      }),
      UserEntity.create({
        id: 2,
        email: "user2@gmail.com",
        username: "user2",
        password: UserPassword.create("qwf123!!").value,
      }),
    ])

    const postRepository = await connection.getRepository(PostEntity)
    await postRepository.save([
      PostEntity.create({
        id: 1,
        title: "title",
        content: "content",
        user: users[0],
        categories: [
          new CategoryEntity({ id: 1, name: "one" }),
          new CategoryEntity({ id: 2, name: "two" }),
        ],
      }),
      PostEntity.create({
        id: 2,
        title: "title",
        content: "content",
        user: users[0],
        categories: [
          new CategoryEntity({ id: 1, name: "one" }),
          new CategoryEntity({ id: 2, name: "two" }),
          new CategoryEntity({ id: 3, name: "three" }),
        ],
      }),
    ])

    // const users = await connection
    //   .createQueryBuilder(UserEntity, "user")
    //   .select(["user.id"])
    //   .orderBy({ "user.id": "ASC" })
    //   .getMany()
    // const userIds = users.map((item) => item.id)
    // const posts = await connection
    //   .createQueryBuilder(PostEntity, "post")
    //   .select(["post.id"])
    //   .orderBy({ "post.id": "ASC" })
    //   .getMany()
    // const postIds = posts.map((item) => item.id)
    // const userNum = users.length
    // const postNum = posts.length
    // await Promise.all(
    //   posts.map(async (post) => {
    //     await factory(CommentEntity)().createMany(
    //       Math.floor(Math.random() * 4) + 3,
    //       {
    //         parentPostId: post.id,
    //         parentCommentId: null,
    //         userId: userIds[Math.floor(Math.random() * userNum)],
    //       }
    //     )
    //   })
    // )
    // const users = await factory(UserEntity)().createMany(15)
    // const categories = await factory(CategoryEntity)().createMany(7)
    // await Promise.all(
    //   users.map(async (user) => {
    //     await factory(PostEntity)()
    //       .map(async (post) => {
    //         post.user = user
    //         if (Math.random() * 10 < 4) {
    //           categories.sort(() => 0.5 - Math.random())
    //           post.categories = [categories[0], categories[1]]
    //         } else {
    //           categories.sort(() => 0.5 - Math.random())
    //           post.categories = [categories[0], categories[1], categories[2]]
    //         }
    //         return post
    //       })
    //       .createMany(Math.floor(10 + Math.random() * 10))
    //   })
    // )
  }
}
