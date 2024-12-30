import BaseEntity from "./base.entity";

export class TokenEntity extends BaseEntity {
  public token: string;
  public expiresAt: Date | undefined;

  constructor(data: Partial<TokenEntity>) {
    super(data);
    this.token = data.token || '';
    this.expiresAt = data.expiresAt;
  }
}