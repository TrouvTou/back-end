import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'user@email.com', description: 'Adresse email de l\'utilisateur' })
  @IsEmail({}, { message: 'Format d\'email invalide' })
  email: string;

  @ApiProperty({ example: 'MotDePasse123!', minLength: 8, maxLength: 100, description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  @MaxLength(100)
  password: string;

  @ApiProperty({ example: 'Jean', maxLength: 50, description: 'Prénom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty({ message: 'Le prénom est requis' })
  @MaxLength(50)
  firstName: string;

  @ApiProperty({ example: 'Dupont', maxLength: 50, description: 'Nom de l\'utilisateur' })
  @IsString()
  @IsNotEmpty({ message: 'Le nom est requis' })
  @MaxLength(50)
  lastName: string;
}