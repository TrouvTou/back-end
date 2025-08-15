export interface JwtPayload {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

export abstract class IJwtService {
  abstract generateAccessToken(payload: JwtPayload): Promise<string>;
  abstract generateRefreshToken(payload: JwtPayload): Promise<string>;
  abstract verifyToken(token: string): Promise<JwtPayload>;
  abstract decodeToken(token: string): JwtPayload;
}