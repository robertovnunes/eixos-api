import BaseRepository from "./base.repository";
import TokenModel, {ITokenModel} from "../models/token.model";
import MongoDBConnection from "../conf/database";

export class TokenRepository extends BaseRepository<ITokenModel> {

  constructor() {
    const tokenModel = new TokenModel().model;
    super(tokenModel);
  }

  async getTokenByToken(token: string): Promise<ITokenModel | null> {
    await MongoDBConnection.getInstance();
    return this.model.findOne({ token });
  }

    async deleteToken(token: string): Promise<void> {
        await MongoDBConnection.getInstance();
        this.model.deleteOne({ token });
    }

}