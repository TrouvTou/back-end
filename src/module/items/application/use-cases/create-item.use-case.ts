import { BadRequestException, Injectable } from '@nestjs/common';
import { IItemRepository } from '../../infrastructure/repositories/item.repository.interface';
import { ItemStatus, ItemType } from '@prisma/client';
import { Category } from '../../infrastructure/entities/category.entity';
import { Item } from '../../infrastructure/entities/item.entity';
import { ICategoryRepository } from '../../infrastructure/repositories/category.repository.interface';
import { IUserRepository } from 'src/module/user/infrastructure/repositories/user.repository.interface';

export interface ICreateItemRequest {
  title: string;
  description: string;
  status: ItemStatus;
  type: ItemType;
  location: string;
  lostFoundAt: Date;
  userId: string;
  categoryId: string;
  attributes?: any | null;
  latitude?: number | null;
  longitude?: number | null;
  radius?: number | null;
  color?: string | null;
  brand?: string | null;
  size?: string | null;
  material?: string | null;
  expiresAt?: Date | null;
}

@Injectable()
export class CreateItemUseCase {
  constructor(
    private readonly itemRepository: IItemRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(request: ICreateItemRequest): Promise<any> {
    // 1. 🔍 VALIDATION # Vérifier les règles métier
    // Vérifier si l'utilisateur existe
    const user = await this.userRepository.findById(request.userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    // verifier if the category exists
    const category = await this.categoryRepository.findById(request.categoryId);
    if (!category) {
      throw new BadRequestException('Category not found');
    }

    // 2. 🧮 LOGIQUE MÉTIER # Calculs, transformations, décisions
    // (Add any business logic or transformations here)

    // 3. 🏭 CRÉATION D'ENTITÉS # Instancier les objets du domain
    const itemData = Item.create(
      request.title,
      request.description,
      request.status,
      request.type,
      request.location,
      request.lostFoundAt,
      request.userId,
      request.categoryId,
      request.attributes,
      request.latitude,
      request.longitude,
      request.radius,
      request.color,
      request.brand,
      request.size,
      request.material,
      request.expiresAt,
    );

    // 4. 💾 PERSISTANCE # Sauvegarder en base
    const item = await this.itemRepository.create(itemData);

    // 5. 🔔 EFFETS DE BORD # Notifications, emails, etc.
    // (Add any side effects here if needed)

    // 6. 📤 RÉPONSE # Retourner le résultat formaté

    return item;
  }
}
