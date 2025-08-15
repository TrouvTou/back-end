import { Injectable } from '@nestjs/common';
import { User as PrismaUser } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { IUserRepository } from 'src/module/user/infrastructure/repositories/user.repository.interface';
import { User } from 'src/module/user/infrastructure/entities/user.entity';


@Injectable()
export class PrismaUserRepository implements IUserRepository {


  constructor(private readonly prisma: PrismaService) {}

  
  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    return user ? this.toDomain(user) : null;
  }
  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    return user ? this.toDomain(user) : null;
  }
  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map(user => this.toDomain(user));
  }
  async save(user: User): Promise<User> {
    const savedUser = await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
      }
    });

    return this.toDomain(savedUser);
  }
  async update(user: User): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
        updatedAt: user.updatedAt
      }
    });

    return this.toDomain(updatedUser);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id }
    });
  }
  async existsByEmail(email: string): Promise<boolean> {
    const count = await this.prisma.user.count({
      where: { email }
    });
    return count > 0;
  }
  private toDomain(prismaUser: PrismaUser): User {
    return new User(
      prismaUser.id,
      prismaUser.email,
      prismaUser.password,
      prismaUser.firstName ?? '',
      prismaUser.lastName ?? '',
      prismaUser.createdAt,
      prismaUser.updatedAt,
      prismaUser.isActive
    );
  }
}