import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ICategoryRepository } from 'src/module/items/infrastructure/repositories/category.repository.interface';
import { Category } from 'src/module/items/infrastructure/entities/category.entity';

@Injectable()
export class PrismaCategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}
  async findByColor(color: string): Promise<Category | null> {
    const found = await this.prisma.category.findFirst({
      where: { color, isDeleted: false },
    });
    if (!found) return null;
    return new Category(found.id, found.name, found.description);
  }

  async findByName(name: string): Promise<Category | null> {
    const found = await this.prisma.category.findUnique({
      where: { name, isDeleted: false },
    });
    if (!found) return null;
    return new Category(found.id, found.name, found.description);
  }

  async create(category: Category): Promise<Category> {
    const created = await this.prisma.category.create({
      data: category,
    });
    return new Category(created.id, created.name, created.description);
  }

  async findById(id: string): Promise<Category | null> {
    const found = await this.prisma.category.findUnique({
      where: { id, isDeleted: false },
      // Include other fields as needed
    });
    if (!found) return null;
    return new Category(found.id, found.name, found.description);
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany({
      where: { isDeleted: false },
    });
    return categories.map(
      (cat) => new Category(cat.id, cat.name, cat.description),
    );
  }

  async update(id: string, category: Category): Promise<Category | null> {
    const updated = await this.prisma.category.update({
      where: { id },
      data: category,
    });
    return new Category(updated.id, updated.name, updated.description);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.update({
      where: { id },
      data: { isDeleted: true },
    });
  }
}
