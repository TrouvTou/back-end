import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { ICategoryRepository } from '../../infrastructure/repositories/category.repository.interface';
import { Category } from '../../infrastructure/entities/category.entity';

export interface ICreateCategoryRequest {
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
}

@Injectable()
export class CreateCategoryUseCase {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(request: ICreateCategoryRequest): Promise<Category> {
    try {
      // 1. 🔍 VALIDATION # Vérifier les règles métier
      const existingCategory = await this.categoryRepository.findByName(
        request.name,
      );
      if (existingCategory) {
        throw new ConflictException('Category already exists');
      }

      // 1.1. Vérifier les doublons
      const existingCategoryByColor = await this.categoryRepository.findByColor(
        request.color,
      );
      if (existingCategoryByColor) {
        throw new ConflictException('Category with this color already exists');
      }

      // 2. 🧮 LOGIQUE MÉTIER # Calculs, transformations, décisions

      // 3. 🏭 CRÉATION D'ENTITÉS # Instancier les objets du domain
      const bodyItem = Category.create(
        request.name,
        request.description,
        request.icon,
        request.color,
        request.isActive,
      );
      // 4. 💾 PERSISTANCE # Sauvegarder en base
      const response = await this.categoryRepository.create(bodyItem);

      // 5. 🔔 EFFETS DE BORD # Notifications, emails, etc.

      // 6. 📤 RÉPONSE # Retourner le résultat formaté
      return response;
      
    } catch (error) {
      // You can customize error handling here
      throw new BadRequestException(
        error.message || 'Failed to create category',
      );
    }
  }
}
