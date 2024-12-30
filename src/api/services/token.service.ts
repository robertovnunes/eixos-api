import { TokenEntity } from "../entities/token.entity";
import { TokenRepository } from "../repositories/token.repository";

export class TokenService {
  private tokenRepository: TokenRepository;

  constructor(tokenRepository: TokenRepository) {
    this.tokenRepository = tokenRepository;
  }

  async createToken(token: TokenEntity): Promise<TokenEntity> {
    const tokenModel = await this.tokenRepository.create(token);
    return new TokenEntity(tokenModel);
  }

  async getTokenByToken(token: string): Promise<TokenEntity | null> {
    const tokenModel = await this.tokenRepository.getTokenByToken(token);
    return tokenModel ? new TokenEntity(tokenModel) : null;
  }

  async deleteToken(token: string): Promise<void> {
    await this.tokenRepository.deleteToken(token);
  }
}