import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ICategoryRepository } from '../../infrastructure/repositories/category.repository.interface';
import { Category } from '../../infrastructure/entities/category.entity';

@Injectable()
export class DeleteCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(id: string): Promise<{ message: string }> {
    try {
      // 1. 🔍 VALIDATION # Vérifier les règles métier
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        throw new BadRequestException('Category not found');
      }

      // 2. 🧮 LOGIQUE MÉTIER # Calculs, transformations, décisions
      // (No specific business logic for deletion in this case)

      // 3. 🏭 CRÉATION D'ENTITÉS # Instancier les objets du domain
      // (No entity creation needed for deletion)

      // 4. 💾 PERSISTANCE # Sauvegarder en base
      await this.categoryRepository.delete(id);

      // 5. 🔔 EFFETS DE BORD # Notifications, emails, etc.
      // (No side effects for deletion in this case)

      // 6. 📤 RÉPONSE # Retourner le résultat formaté
      // (Void return for deletion)
      return {
        message: 'Category deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete category',
      );
    }
  }
}
