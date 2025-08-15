import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './module/user/controllers/auth.controller';
import { PrismaService } from './database/prisma.service';
import { IUserRepository } from './module/user/infrastructure/repositories/user.repository.interface';
import { PrismaUserRepository } from './database/repositories/prisma-user.repository';
import { IItemRepository } from './module/items/infrastructure/repositories/item.repository.interface';
import { PrismaItemRepository } from './database/repositories/prisma-item.repository';
import { ICategoryRepository } from './module/items/infrastructure/repositories/category.repository.interface';
import { PrismaCategoryRepository } from './database/repositories/prisma-category.repository';
import { IHashService } from './module/user/services/hash.service.interface';
import { BcryptHashService } from './services/bcrypt-hash.service';
import { RegisterUseCase } from './module/user/application/use-cases/register.use-case';
import { LoginUseCase } from './module/user/application/use-cases/login.use-case';
import { RefreshTokenUseCase } from './module/user/application/use-cases/refresh-token.use-case';
import { JwtStrategy } from './module/user/strategies/jwt.strategy';
import { CategoryController } from './module/items/controllers/category.controller';
import { CreateCategoryUseCase } from './module/items/application/use-cases/create-category.use-case';
import { ListCategoryUseCase } from './module/items/application/use-cases/list-category.use-case';
import { DeleteCategoryUseCase } from './module/items/application/use-cases/delete-category.use-case';
import { UpdateCategoryUseCase } from './module/items/application/use-cases/update-category.use-case';
import { ItemController } from './module/items/controllers/item.controller';
import { CreateItemUseCase } from './module/items/application/use-cases/create-item.use-case';
import { IJwtService } from './module/user/services/jwt.service.interface';
import { JwtService } from './services/jwt.service';
import { ListItemUseCase } from './module/items/application/use-cases/list-item.use-case';
// Use Cases

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '15m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, CategoryController, ItemController],
  providers: [
    // [Database]
    PrismaService,
    // [Hashing]
    {
      provide: IHashService,
      useClass: BcryptHashService,
    },
    // [JWT]
    {
      provide: IJwtService,
      useClass: JwtService,
    },
    JwtStrategy,
    RegisterUseCase,
    LoginUseCase,
    RefreshTokenUseCase,
    // [User]
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },

    // [Item]
    {
      provide: IItemRepository,
      useClass: PrismaItemRepository,
    },
    CreateItemUseCase,
    ListItemUseCase,
    {
      provide: ICategoryRepository,
      useClass: PrismaCategoryRepository,
    },
    CreateCategoryUseCase,
    ListCategoryUseCase,
    DeleteCategoryUseCase,
    UpdateCategoryUseCase,
  ],
  exports: [
    IUserRepository,
    IItemRepository,
    ICategoryRepository,
    IHashService,
    IJwtService,
    JwtModule,
  ],
})
// export class AuthModule {}
export class AppModule {}
