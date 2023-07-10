import { injectable, inject } from "inversify"
import { DataSource, EntityManager, Repository } from "typeorm"
import { PostEntity } from "./PostEntity"
import { PostRepository } from "../domain/repository/PostRepository"
import Types from "../../../config/Types"
import { Post } from "../domain/model/Post"
import { BadRequest } from "../../../shared/util/exceptions"
import { User } from "../../user/domain/model/User"
import { Category } from "../../category/domain/model/Category"
import { PostTitle } from "../domain/model/PostTitle"

@injectable()
export class PostOrmRepository implements PostRepository {
  private readonly repository: Repository<PostEntity>

  constructor(@inject(Types.AppDataSource) private dataSource: DataSource) {
    this.repository = dataSource.getRepository(PostEntity)
  }
  async save(post: Post, transaction?: EntityManager): Promise<Post> {
    let newPost: PostEntity
    if (transaction) {
      newPost = await transaction.save(PostEntity.of(post))
    } else {
      newPost = await this.repository.save(PostEntity.of(post))
    }

    return newPost.toDomain()
  }

  async findById(id: number, me: number = 0): Promise<Post> {
    const post = await this.dataSource.query(
      `SELECT p.id, p.title, p.content, p.createdAt, p.userId, u.username, numComments, point,  pv.value as 'like', JSON_ARRAYAGG(c.name) AS categories FROM post p
       INNER JOIN user u ON p.userId = u.id
       LEFT JOIN post_to_category pc ON p.id = pc.postId
       LEFT JOIN category c ON pc.categoryId = c.id
       LEFT JOIN (
        SELECT post.id, COUNT(cm.parentPostId) as numComments FROM post
        LEFT JOIN comment cm ON post.id = cm.parentPostId
        GROUP BY post.id
       ) pcm ON p.id = pcm.id
       LEFT JOIN (
        SELECT post.id, IFNULL(SUM(pv.value),0) as point FROM post
        LEFT JOIN postVote pv ON post.id = pv.postId
        GROUP BY post.id
       ) spv ON p.id = spv.id
       LEFT JOIN postVote pv ON (p.id = pv.postId AND pv.userId = ?) 
       WHERE p.id = ?
       GROUP BY p.id, pv.value
       `,
      [me, id]
    )

    if (post.length <= 0) {
      return null
    }

    const {
      id: postId,
      title,
      content,
      createdAt,
      userId,
      username,
      numComments,
      point,
      categories,
      like,
    } = post[0]

    return Post.create({
      id: postId,
      title,
      content,
      createdAt,
      user: User.create({ id: userId, username }),
      numComments: parseInt(numComments),
      point: parseInt(point),
      like: like == 1 ? true : like == -1 ? false : null,
      categories:
        categories[0] == null
          ? []
          : categories.map((name) => Category.create({ name })),
    })
  }

  async findWithUserId(id: number, userId: number): Promise<Post> {
    const postEntity = await this.repository.findOne({
      where: { id, user: { id: userId } },
      relations: ["user"],
      order: { updatedAt: "DESC" },
    })
    if (!postEntity) {
      return null
    } else {
      return postEntity.toDomain()
    }
  }

  async findPosts(
    skip: number,
    take: number,
    order: string,
    me?: number
  ): Promise<[Post[], number]> {
    let orderString
    if (order == "newest") {
      orderString = "p.id DESC"
    } else if (order == "popular") {
      orderString = "point DESC, p.id DESC"
    }
    const posts = await this.dataSource.query(
      `SELECT p.id, p.title, p.content, p.createdAt, p.userId, u.username, numComments, point,  pv.value as 'like', JSON_ARRAYAGG(c.name) AS categories FROM post p
       INNER JOIN user u ON p.userId = u.id
       LEFT JOIN post_to_category pc ON p.id = pc.postId
       LEFT JOIN category c ON pc.categoryId = c.id
       LEFT JOIN (
        SELECT post.id, COUNT(cm.parentPostId) as numComments FROM post
        LEFT JOIN comment cm ON post.id = cm.parentPostId
        GROUP BY post.id
       ) pcm ON p.id = pcm.id
       LEFT JOIN (
        SELECT post.id, IFNULL(SUM(pv.value),0) as point FROM post
        LEFT JOIN postVote pv ON post.id = pv.postId
        GROUP BY post.id
       ) spv ON p.id = spv.id
       LEFT JOIN postVote pv ON (p.id = pv.postId AND pv.userId = ${me})
       GROUP BY p.id, pv.value
       ORDER BY ${orderString}
       LIMIT ${take} OFFSET ${skip};
       `
    )

    const total = parseInt(
      (
        await this.dataSource.query(
          `SELECT COUNT(1) as total
           FROM post p`
        )
      )[0].total
    )

    if (!posts.length) {
      return [[], total]
    }

    const result = posts.map((post) => {
      const {
        id,
        title,
        content,
        createdAt,
        userId,
        username,
        numComments,
        point,
        categories,
        like,
      } = post

      return Post.create({
        id,
        title,
        content,
        createdAt,
        user: User.create({ id: userId, username }),
        numComments: parseInt(numComments),
        point: parseInt(point),
        like: like == 1 ? true : like == -1 ? false : null,
        categories:
          categories[0] == null
            ? []
            : categories.map((name) => Category.create({ name })),
      })
    })

    return [result, total]
  }

  async findPostsByCategory(
    skip: number,
    take: number,
    category: string,
    me?: number
  ): Promise<[Post[], number]> {
    const ids = await this.dataSource.query(
      `SELECT pc.postId
       FROM post_to_category pc
        INNER JOIN category c ON pc.categoryId = c.id
       WHERE c.name = '${category}'
       ORDER BY pc.postId DESC
       LIMIT ${take} OFFSET ${skip};`
    )

    const total = parseInt(
      (
        await this.dataSource.query(
          `SELECT COUNT(1) as total
       FROM post_to_category pc
        INNER JOIN category c ON pc.categoryId = c.id
       WHERE c.name = '${category}'`
        )
      )[0].total
    )

    if (!ids.length) {
      return [[], total]
    }

    const idsString = `(${ids.map((id) => id.postId).toString()})`

    const posts = await this.dataSource.query(
      `SELECT p.id, p.title, p.content, p.createdAt, p.userId, u.username, numComments, point,  pv.value as 'like', JSON_ARRAYAGG(c.name) AS categories
       FROM post p
          INNER JOIN user u ON p.userId = u.id
          LEFT JOIN post_to_category pc ON p.id = pc.postId
          LEFT JOIN category c ON pc.categoryId = c.id
          LEFT JOIN (
            SELECT post.id, COUNT(cm.parentPostId) as numComments
            FROM post
              LEFT JOIN comment cm ON post.id = cm.parentPostId
            GROUP BY post.id) pcm ON p.id = pcm.id
          LEFT JOIN (
            SELECT post.id, IFNULL(SUM(pv.value),0) as point
            FROM post
              LEFT JOIN postVote pv ON post.id = pv.postId
            GROUP BY post.id
          ) spv ON p.id = spv.id
          LEFT JOIN postVote pv ON (p.id = pv.postId AND pv.userId = ${me})
       WHERE p.id IN ${idsString}
       GROUP BY p.id, pv.value
       ORDER BY p.id DESC;
       `
    )

    const result = posts.map((post) => {
      const {
        id,
        title,
        content,
        createdAt,
        userId,
        username,
        numComments,
        point,
        categories,
        like,
      } = post

      return Post.create({
        id,
        title,
        content,
        createdAt,
        user: User.create({ id: userId, username }),
        numComments: parseInt(numComments),
        point: parseInt(point),
        like: like == 1 ? true : like == -1 ? false : null,
        categories:
          categories[0] == null
            ? []
            : categories.map((name) => Category.create({ name })),
      })
    })

    return [result, total]
  }

  async findPostsByUsername(
    skip: number,
    take: number,
    username: string,
    me?: number
  ): Promise<[Post[], number]> {
    const posts = await this.dataSource.query(
      `SELECT p.id, p.title, p.content, p.createdAt, p.userId, u.username, numComments, point,  pv.value as 'like', JSON_ARRAYAGG(c.name) AS categories
       FROM post p
          INNER JOIN user u ON p.userId = u.id
          LEFT JOIN post_to_category pc ON p.id = pc.postId
          LEFT JOIN category c ON pc.categoryId = c.id
          LEFT JOIN (
            SELECT post.id, COUNT(cm.parentPostId) as numComments
            FROM post
              LEFT JOIN comment cm ON post.id = cm.parentPostId
            GROUP BY post.id) pcm ON p.id = pcm.id
          LEFT JOIN (
            SELECT post.id, IFNULL(SUM(pv.value),0) as point
            FROM post
              LEFT JOIN postVote pv ON post.id = pv.postId
            GROUP BY post.id
          ) spv ON p.id = spv.id
          LEFT JOIN postVote pv ON (p.id = pv.postId AND pv.userId = ${me})
       WHERE u.username = "${username}"
       GROUP BY p.id, pv.value
       ORDER BY p.id DESC
       LIMIT ${take} OFFSET ${skip};
       `
    )

    if (!posts.length) {
      return [[], 0]
    }

    const total = parseInt(
      (
        await this.dataSource.query(
          `SELECT COUNT(1) as total
           FROM post p
            INNER JOIN user u ON p.userId = u.id
           WHERE u.username = '${username}'`
        )
      )[0].total
    )

    const result = posts.map((post) => {
      const {
        id,
        title,
        content,
        createdAt,
        userId,
        username,
        numComments,
        point,
        categories,
        like,
      } = post

      return Post.create({
        id,
        title,
        content,
        createdAt,
        user: User.create({ id: userId, username }),
        numComments: parseInt(numComments),
        point: point ? parseInt(point) : 0,
        like: like == 1 ? true : like == -1 ? false : null,
        categories:
          categories[0] == null
            ? []
            : categories.map((name) => Category.create({ name })),
      })
    })

    return [result, total]
  }
  // async getManyPosts(
  //   skip: number,
  //   take: number,
  //   order: string,
  //   category: string,
  //   user: string,
  //   me: number
  // ): Promise<[Post[], number]> {
  //   const orderOption = {}
  //   switch (order) {
  //     case "newest":
  //       orderOption["post.createdAt"] = "DESC"
  //       break
  //     case "old":
  //       orderOption["post.createdAt"] = "ASC"
  //       break

  //     default:
  //       orderOption["post.createdAt"] = "DESC"
  //       break
  //   }

  //   const whereOption = {}
  //   whereOption["categories"] = { name: category }
  //   whereOption["user"] = { username: user }

  //   const qb = await this.repository
  //     .createQueryBuilder("post")
  //     .select([
  //       "post.id",
  //       "post.title",
  //       "post.content",
  //       "post.createdAt",
  //       "post.updatedAt",
  //       "user.id",
  //       "user.username",
  //     ])
  //     .loadRelationCountAndMap("post.numComments", "post.comments")
  //     .leftJoin("post.user", "user")
  //     .leftJoinAndSelect("post.categories", "category")
  //     .orderBy(orderOption)
  //     .take(take)
  //     .skip(skip)

  //   if (category) {
  //     const temp = await this.dataSource.query(
  //       `SELECT p.id FROM post p
  //        INNER JOIN post_to_category pc ON p.id = pc.postId
  //        LEFT JOIN category c ON pc.categoryId = c.id
  //        WHERE c.name = ?;`,
  //       [category]
  //     )
  //     if (temp.length == 0) {
  //       return [[], 0]
  //     }

  //     const ids = temp.map((item) => item.id)
  //     qb.andWhere("post.id IN (:id)", { id: ids })
  //   }
  //   if (user) {
  //     qb.andWhere("user.username = :user", { user })
  //   }

  //   const [postEntities, total] = await qb.getManyAndCount()
  //   return [postEntities.map((entity) => entity.toDomain()), total]
  // }

  async delete(id: number): Promise<Boolean> {
    const { affected } = await this.repository.delete({ id })
    return !!affected
  }

  async temp(id: number): Promise<Post> {
    const post = await this.repository.findOne({
      where: { id },
      relations: ["user"],
    })
    return post.toDomain()
  }
}
