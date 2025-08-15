import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'Adresse email de l\'utilisateur' })
  @IsEmail({}, { message: 'Format d\'email invalide' })
  email: string;

  @ApiProperty({ example: 'motdepasse123', description: 'Mot de passe de l\'utilisateur' })
  @IsString()
  @IsNotEmpty({ message: 'Le mot de passe est requis' })
  password: string;
}