import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ICategoryRepository } from '../../infrastructure/repositories/category.repository.interface';
import { Category } from '../../infrastructure/entities/category.entity';

@Injectable()
export class ListCategoryUseCase {

  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(): Promise<Category[]> {
    try {
      // 1. 🔍 VALIDATION # Vérifier les règles métier

      // 2. 🧮 LOGIQUE MÉTIER # Calculs, transformations, décisions

      // 3. 🏭 CRÉATION D'ENTITÉS # Instancier les objets du domain

      // 4. 💾 PERSISTANCE # Sauvegarder en base
      const response = await this.categoryRepository.findAll();

      // 5. 🔔 EFFETS DE BORD # Notifications, emails, etc.

      // 6. 📤 RÉPONSE # Retourner le résultat formaté
      return response;
    } catch (error) {
      // You can customize error handling here
      throw new BadRequestException(error.message);
    }
  }
}
