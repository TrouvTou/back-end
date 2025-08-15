import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
// import { AuthLogService } from 'src/logs/auth-log/auth-log.service';

@Injectable()
export class AuthLogMiddleware implements NestMiddleware {
  // TODO:Gestion log  constructor(private authLogService: AuthLogService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Intercepter les réponses d'authentification
    const originalSend = res.send;
    
    res.send = function(data) {
      // Logger selon le code de statut et la route
      if (req.url.includes('/auth/login')) {
        if (res.statusCode === 200) {
          // Connexion réussie - sera loggée dans le controller
        } else {
          // Connexion échouée
          const body = typeof data === 'string' ? JSON.parse(data) : data;
          // authLogService.logFailedLogin sera appelé dans le controller
        }
      }
      
      return originalSend.call(this, data);
    };

    next();
  }
}
