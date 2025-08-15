import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsBoolean,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Category Name', description: 'Nom de la catégorie' })
  @IsString()
  @IsNotEmpty({ message: 'Le nom est requis' })
  name: string;

  @ApiProperty({
    example: 'Description de la catégorie',
    description: 'Description de la catégorie',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'icon-name',
    description: "Nom de l'icône de la catégorie",
  })
  @IsString()
  icon: string;

  @ApiProperty({
    example: '#FF5733',
    description: 'Couleur associée à la catégorie',
  })
  @IsString()
  color: string;

  @ApiProperty({ example: true, description: 'La catégorie est active ou non' })
  @IsBoolean({ message: 'L\'état d\'activité doit être un booléen' })
  isActive: boolean;
}
