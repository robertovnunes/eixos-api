import UserModel, { IUserModel } from "../models/user.model";
import BaseRepository from "./base.repository";
import MongoDBConnection from '../conf/database';

export default class UserRepository extends BaseRepository<IUserModel> {
  constructor() {
    const userModel = new UserModel().model;
    super(userModel);
  }

  /**
   * Busca um usuário com base no e-mail fornecido.
   * @param email - E-mail do usuário a ser buscado.
   * @returns O usuário encontrado ou null.
   */
  async findByEmail(email: string): Promise<IUserModel | null> {
    await MongoDBConnection.getInstance();
    return this.model.findOne({ email }).exec();
  }

    /**   
     * Busca temporizador definido como padrão pelo usuário.
     * @param userId - ID do usuário.
     * @returns O ID do temporizador padrão ou null.
    */
    async findDefaultTimer(userId: string): Promise<string | null> {
        await MongoDBConnection.getInstance();
        const user = await this.model.findById(userId).exec();
        if (user && user.defaultTimer) {
            return user.defaultTimer.toString();
        }
        return null;
    }

    /**
     * atualiza o refreshToken do usuário.
     * @param userId - ID do usuário.
     * @param refreshToken - Token de atualização.
     * @returns O usuário atualizado.
     */
    async updateRefreshToken(email: string, refreshToken: string): Promise<void> {
        await MongoDBConnection.getInstance();
        this.model.findOneAndUpdate({email}, { refreshToken }).exec();
    }

    /**
     * Busca usuario pelo refreshToken.
     * @param refreshToken - Token de atualização.
     * @returns O usuário encontrado ou null.
     */
    async findByRefreshToken(refreshToken: string): Promise<IUserModel | null> {
        await MongoDBConnection.getInstance();
        return this.model.findOne({ refreshToken }).exec();
    }
}