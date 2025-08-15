import { User } from "../entities/user.entity";

export abstract class IUserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: string): Promise<User | null>;
  abstract save(user: User): Promise<User>;
  abstract update(user: User): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract existsByEmail(email: string): Promise<boolean>;
  abstract findAll(): Promise<User[]>;
}