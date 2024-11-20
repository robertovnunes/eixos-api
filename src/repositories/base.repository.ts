import Database from '../conf/database';
import BaseEntity from '../entities/base.entity';
import { HttpInternalServerError } from '../utils/errors/http.error';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import path from 'path';

type FilterFunction<T> = (item: T) => boolean;

export default class BaseRepository<T extends BaseEntity> {
  private filePath: string;
  private db: T[] = [];

  constructor(fileName: string) {
    try{
      this.filePath = path.join(__dirname, '../../database', `${fileName}.json`);
      this.loadData().then(data => this.db = data);
    } catch (error) {
      throw new HttpInternalServerError({msg: 'Error while trying to access the database', msgCode: 'database-error'});
    }
  }

  // Método para carregar dados do arquivo
  private async loadData(): Promise<T[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as T[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // Retorna um array vazio se o arquivo não existir
        return [];
      }
      throw error;
    }
  }

  // Método para salvar dados no arquivo
  private async saveData(data: T[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  // CRUD Methods
  async findAll(): Promise<T[]> {
    return this.db;
  }

  async findById(id: string): Promise<T | null> {
    return this.db.find((item: any) => item.id === id) || null;
  }

  async create(item: T): Promise<T> {
    const data = await this.loadData();
    const newItem = { ...item, id: uuidv4() };
    data.push(newItem);
    await this.saveData(data);
    return item;
  }

  async update(id: string, updatedItem: Partial<T>): Promise<T | null> {
    const data = await this.loadData();
    const index = data.findIndex((item: any) => item.id === id);
    if (index === -1) return null;

    // Atualiza apenas os campos fornecidos
    const updatedData = { ...data[index], ...updatedItem };
    data[index] = updatedData;
    await this.saveData(data);
    return updatedData;
  }

  async delete(id: string): Promise<boolean> {
    const data = await this.loadData();
    const filteredData = data.filter((item: any) => item.id !== id);
    if (filteredData.length === data.length) return false;

    await this.saveData(filteredData);
    return true;
  }
}
