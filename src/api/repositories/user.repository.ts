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
    try {
      await MongoDBConnection.getInstance();
      return this.model.findOne({ email }).exec();
    } catch (error) {
      console.error(`Erro ao buscar usuário por e-mail: ${error}`);
      return null;
    }
  }

    /**   
     * Busca temporizador definido como padrão pelo usuário.
     * @param userId - ID do usuário.
     * @returns O ID do temporizador padrão ou null.
    */
    async findDefaultTimer(userId: string): Promise<string | null> {
        try {
            await MongoDBConnection.getInstance();
            const user = await this.model.findById(userId).exec();
            return user && user.defaultTimer ? user.defaultTimer.toString() : null;
        } catch (error) {
            console.error(`Erro ao buscar temporizador padrão: ${error}`);
            return null;
        }
    }

    /**
     * atualiza o refreshToken do usuário.
     * @param userId - ID do usuário.
     * @param refreshToken - Token de atualização.
     * @returns O usuário atualizado.
     */
    async updateRefreshToken(email: string, refreshToken: string): Promise<void> {
        try {
          await MongoDBConnection.getInstance();
        this.model.findOneAndUpdate({email}, { refreshToken }).exec();
        } catch (error) {
            console.error(`Erro ao atualizar refreshToken: ${error}`);
          throw error;
        }
    }

    /**
     * Busca usuario pelo refreshToken.
     * @param refreshToken - Token de atualização.
     * @returns O usuário encontrado ou null.
     */
    async findByRefreshToken(refreshToken: string): Promise<IUserModel | null> {
        try {
          await MongoDBConnection.getInstance();
          console.log('chegou aqui3');
          return this.model.findOne({ refreshToken }).exec();
        } catch (error) {
          console.error(`Erro ao buscar usuário por refreshToken: ${error}`);
          return null;
        }
    }
}