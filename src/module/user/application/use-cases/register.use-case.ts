import {
  Injectable,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { IUserRepository } from '../../infrastructure/repositories/user.repository.interface';
import { IHashService } from '../../services/hash.service.interface';
import { IJwtService } from '../../services/jwt.service.interface';
import { User } from '../../infrastructure/entities/user.entity';

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(request: RegisterRequest): Promise<AuthResponse> {
    // Validation métier
    if (!this.isValidEmail(request.email)) {
      throw new BadRequestException('Email invalide');
    }

    if (request.password.length < 8) {
      throw new BadRequestException(
        'Le mot de passe doit contenir au moins 8 caractères',
      );
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new ConflictException(
        'Un compte avec cette adresse email existe déjà',
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await this.hashService.hash(request.password);

    // Créer l'utilisateur
    const user = User.create(
      request.email,
      hashedPassword,
      request.firstName,
      request.lastName,
    );

    // Sauvegarder en base
    const savedUser = await this.userRepository.save(user);

    // Générer les tokens
    const payload = {
      sub: savedUser.id,
      email: savedUser.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.generateAccessToken(payload),
      this.jwtService.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
      user: savedUser.getPublicProfile(),
    };
  }
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
