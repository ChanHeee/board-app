import { MigrationInterface, QueryRunner } from "typeorm"
import { UserEntity } from "../src/modules/user/infrastructure/UserEntity"
import { UserPassword } from "../src/modules/user/domain/model/UserPassword"
import { PostEntity } from "../src/modules/post/infrastructure/PostEntity"
import { CategoryEntity } from "../src/modules/category/infrastructure/CategoryEntity"

export class SeedForTest1692342207974 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // const userRepository = queryRunner.manager.getRepository(UserEntity)

    //save users
    const user1 = await queryRunner.manager.save(
      new UserEntity({
        id: 1,
        email: "user1@gmail.com",
        username: "user1",
        password: UserPassword.create("qwf123!!").value,
      })
    )
    const user2 = await queryRunner.manager.save(
      new UserEntity({
        id: 2,
        email: "user2@gmail.com",
        username: "user2",
        password: UserPassword.create("qwf123!!").value,
      })
    )
    // const users = queryRunner.manager.save([
    //   new UserEntity({
    //     id: 1,
    //     email: "user1@gmail.com",
    //     username: "user1",
    //     password: UserPassword.create("qwf123!!").value,
    //   }),
    //   new UserEntity({
    //     id: 2,
    //     email: "user2@gmail.com",
    //     username: "user2",
    //     password: UserPassword.create("qwf123!!").value,
    //   }),
    // ])

    // const postRepository = queryRunner.manager.getRepository(PostEntity)
    // save posts
    const posts = queryRunner.manager.save([
      PostEntity.create({
        id: 1,
        title: "title",
        content: "content",
        user: user1,
        categories: [
          new CategoryEntity({ id: 1, name: "one" }),
          new CategoryEntity({ id: 2, name: "two" }),
        ],
      }),
      PostEntity.create({
        id: 2,
        title: "title",
        content: "content",
        user: user2,
        categories: [
          new CategoryEntity({ id: 1, name: "one" }),
          new CategoryEntity({ id: 2, name: "two" }),
          new CategoryEntity({ id: 3, name: "three" }),
        ],
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
