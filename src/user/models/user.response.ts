import type { User } from '@prisma/client';

export class UserResponse {
  id: number;

  username: string;

  email: string;

  emailVerified: boolean;

  name: string;

  image: string | null;

  birthDate: Date | null; // ISO Date

  registrationDate: Date; // ISO Date

  static fromUserEntity(entity: User): UserResponse {
    const response = new UserResponse();
    response.id = entity.id;
    response.email = entity.email;
    response.emailVerified = entity.emailVerified;
    response.name = [entity.firstName, entity.middleName, entity.lastName]
      .filter((s) => s !== null)
      .join(' ');
    return response;
  }
}
