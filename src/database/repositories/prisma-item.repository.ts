import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { IItemRepository } from 'src/module/items/infrastructure/repositories/item.repository.interface';
import { Item } from 'src/module/items/infrastructure/entities/item.entity';

@Injectable()
export class PrismaItemRepository implements IItemRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(item: Item): Promise<any> {
    const prismaItem = await this.prisma.item.create({
      data: item,
    });

    return prismaItem;
  }

  async findAll(): Promise<Item[]> {
    const items = await this.prisma.item.findMany();
    return items;
  }
}
