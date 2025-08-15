import { Category } from "../entities/category.entity";

export abstract class ICategoryRepository {
    abstract create(category: Category): Promise<Category>;
    abstract findByName(name: string): Promise<Category | null>;
    abstract findByColor(color: string): Promise<Category | null>;
    abstract findById(id: string): Promise<Category | null>;
    abstract findAll(): Promise<Category[]>;
    abstract update(id: string, category: Partial<Category>): Promise<Category | null>;
    abstract delete(id: string): Promise<void>;
}