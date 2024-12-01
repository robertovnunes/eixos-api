import { Model, Document } from 'mongoose';

export default abstract class BaseRepository<T extends Document> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const record = new this.model(data);
    return await record.save();
  }

  async findById(id: string): Promise<T | null> {
    return await this.model.findById(id);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return await this.model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<T | null> {
    return await this.model.findByIdAndDelete(id);
  }
}
