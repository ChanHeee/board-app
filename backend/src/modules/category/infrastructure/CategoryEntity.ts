import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm"
import { Category } from "../domain/model/Category"
import { PostEntity } from "../../post/infrastructure/PostEntity"

@Entity({ name: "category" })
@Unique(["name"])
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ charset: "utf8mb4_bin" })
  name: string

  constructor(init?: Partial<CategoryEntity>) {
    Object.assign(this, init)
  }

  static of(category: Category) {
    return new CategoryEntity({
      ...category,
    })
  }

  toDomain(): Category {
    return Category.create(this)
  }
}
