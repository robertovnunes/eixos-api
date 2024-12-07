import { Model, Document } from 'mongoose';
import MongoDBConnection from '../conf/database';

/**
 * Classe base abstrata para repositórios.
 *
 * Fornece métodos básicos para interagir com o banco de dados MongoDB
 * usando o Mongoose.
 *
 * @template T - Tipo de documento do Mongoose.
 */
export default abstract class BaseRepository<T extends Document> {
  /**
   * Instância do modelo do Mongoose.
   * @protected
   */
  protected model: Model<T>;

  /**
   * Construtor.
   * @param model - Modelo do Mongoose a ser usado pelo repositório.
   */
  constructor(model: Model<T>) {
    this.model = model;
  }

  /**
   * Cria um novo registro no banco de dados.
   * @param data - Dados do novo registro.
   * @returns Promise que resolve com o registro criado.
   */
  async create(data: Partial<T>): Promise<T> {
    await MongoDBConnection.getInstance(); // Garantir que o banco está conectado
    const record = new this.model(data);
    return await record.save();

  }

  /**
   * Busca um registro pelo ID.
   * @param id - ID do registro.
   * @returns Promise que resolve com o registro encontrado ou null se não encontrado.
   */
  async findById(id: string): Promise<T | null> {
    await MongoDBConnection.getInstance();
    return await this.model.findById(id);
  }

  /**
   * Busca todos os registros.
   * @returns Promise que resolve com uma lista de registros.
   */
  async findAll(): Promise<T[]> {
    await MongoDBConnection.getInstance();
    return await this.model.find();
  }

  /**
   * Atualiza um registro pelo ID.
   * @param id - ID do registro a ser atualizado.
   * @param data - Dados a serem atualizados.
   * @returns Promise que resolve com o registro atualizado ou null se não encontrado.
   */
  async update(id: string, data: Partial<T>): Promise<T | null> {
    await MongoDBConnection.getInstance();
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  /**
   * Exclui um registro pelo ID.
   * @param id - ID do registro a ser excluído.
   * @returns Promise que resolve com o registro excluído ou null se não encontrado.
   */
  async delete(id: string): Promise<T | null> {
    await MongoDBConnection.getInstance();
    return await this.model.findByIdAndDelete(id);
  }
}
