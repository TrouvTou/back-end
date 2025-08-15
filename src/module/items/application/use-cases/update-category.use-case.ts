import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ICategoryRepository } from '../../infrastructure/repositories/category.repository.interface';
import { Category } from '../../infrastructure/entities/category.entity';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(
    id: string,
    data: Partial<Category>,
  ): Promise<{ message: string }> {
    try {
      // 1. 🔍 VALIDATION # Vérifier les règles métier
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        throw new BadRequestException('Category not found');
      }
      if (data.name) {
        const existingByName = await this.categoryRepository.findByName(data.name);
        if (existingByName && existingByName.id !== id) {
          throw new ConflictException('Category name already exists');
        }
      }
      if (data.color) {
        const existingByColor = await this.categoryRepository.findByColor(data.color);
        if (existingByColor && existingByColor.id !== id) {
          throw new ConflictException('Category color already exists');
        }
      }

      // 2. 🧮 LOGIQUE MÉTIER # Calculs, transformations, décisions
      // (No specific business logic for deletion in this case)

      // 3. 🏭 CRÉATION D'ENTITÉS # Instancier les objets du domain
      // (No entity creation needed for deletion)

      // 4. 💾 PERSISTANCE # Sauvegarder en base
      await this.categoryRepository.update(id, data);

      // 5. 🔔 EFFETS DE BORD # Notifications, emails, etc.
      // (No side effects for deletion in this case)

      // 6. 📤 RÉPONSE # Retourner le résultat formaté
      // (Void return for deletion)
      return {
        message: 'Category updated successfully',
      };
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Failed to delete category',
      );
    }
  }
}
