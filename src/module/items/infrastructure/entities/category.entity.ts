import { ItemStatus, ItemType } from '@prisma/client';

export class Category {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description?: string | null,
    public readonly icon?: string | null,
    public readonly color?: string | null,
    public readonly isActive: boolean = true,
    public readonly isDeleted: boolean = false,
  ) {}

  static create(
    name: string,
    description?: string | null,
    icon?: string | null,
    color?: string | null,
    isActive: boolean = true,
  ): Category {
    return new Category(
      crypto.randomUUID(),
      name,
      description,
      icon,
      color,
      isActive,
    );
  }
}
