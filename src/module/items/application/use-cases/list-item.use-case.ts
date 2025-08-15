import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Item } from '../../infrastructure/entities/item.entity';
import { IItemRepository } from '../../infrastructure/repositories/item.repository.interface';

@Injectable()
export class ListItemUseCase {

  constructor(private readonly itemRepository: IItemRepository) {}

  async execute(): Promise<Item[]> {
    try {
      // 1. 🔍 VALIDATION # Vérifier les règles métier

      // 2. 🧮 LOGIQUE MÉTIER # Calculs, transformations, décisions

      // 3. 🏭 CRÉATION D'ENTITÉS # Instancier les objets du domain

      // 4. 💾 PERSISTANCE # Sauvegarder en base
      const response = await this.itemRepository.findAll();

      // 5. 🔔 EFFETS DE BORD # Notifications, emails, etc.

      // 6. 📤 RÉPONSE # Retourner le résultat formaté
      return response;
    } catch (error) {
      // You can customize error handling here
      throw new BadRequestException(error.message);
    }
  }
}
