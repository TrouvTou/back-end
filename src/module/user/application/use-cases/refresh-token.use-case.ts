import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthResponse } from './register.use-case';
import { IUserRepository } from '../../infrastructure/repositories/user.repository.interface';
import { IJwtService } from '../../services/jwt.service.interface';

export interface RefreshTokenRequest {
  refreshToken: string;
}

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly jwtService: IJwtService,
  ) {}

  async execute(request: RefreshTokenRequest): Promise<AuthResponse> {
    try {
      // Vérifier le refresh token
      const payload = await this.jwtService.verifyToken(request.refreshToken);

      // Rechercher l'utilisateur
      const user = await this.userRepository.findById(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Token invalide');
      }

      // Générer de nouveaux tokens
      const newPayload = {
        sub: user.id,
        email: user.email,
      };

      const [accessToken, refreshToken] = await Promise.all([
        this.jwtService.generateAccessToken(newPayload),
        this.jwtService.generateRefreshToken(newPayload),
      ]);

      return {
        accessToken,
        refreshToken,
        user: user.getPublicProfile(),
      };
    } catch (error) {
      throw new UnauthorizedException('Token invalide');
    }
  }
}