import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthResponse } from './register.use-case';
import { IUserRepository } from '../../infrastructure/repositories/user.repository.interface';
import { IHashService } from '../../services/hash.service.interface';
import { IJwtService } from '../../services/jwt.service.interface';

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashService: IHashService,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(request: LoginRequest): Promise<AuthResponse> {
    // Validation des entrées
    if (!request.email || !request.password) {
      throw new BadRequestException('Email et mot de passe requis');
    }

    // Rechercher l'utilisateur
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Vérifier si le compte est actif
    if (!user.isActive) {
      throw new UnauthorizedException('Compte désactivé');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await this.hashService.compare(request.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    // Générer les tokens
    const payload = {
      sub: user.id,
      email: user.email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.generateAccessToken(payload),
      this.jwtService.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
      user: user.getPublicProfile(),
    };
  }
}