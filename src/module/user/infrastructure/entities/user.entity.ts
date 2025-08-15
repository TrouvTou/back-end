export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly password: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly isActive: boolean = true
  ) {}

  static create(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): User {
    return new User(
      crypto.randomUUID(),
      email,
      password,
      firstName,
      lastName,
      new Date(),
      new Date()
    );
  }

  updatePassword(newPassword: string): User {
    return new User(
      this.id,
      this.email,
      newPassword,
      this.firstName,
      this.lastName,
      this.createdAt,
      new Date(),
      this.isActive
    );
  }

  deactivate(): User {
    return new User(
      this.id,
      this.email,
      this.password,
      this.firstName,
      this.lastName,
      this.createdAt,
      new Date(),
      false
    );
  }

  getPublicProfile() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      isActive: this.isActive,
      createdAt: this.createdAt
    };
  }
}