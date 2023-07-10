import { Category } from "../model/Category"

export interface CategoryRepository {
  save(categories: string[], transaction?: any): Promise<Category[]>
  findOrderByCount(take: number): Promise<string[]>
  delete(name: string): Promise<Boolean>
}
