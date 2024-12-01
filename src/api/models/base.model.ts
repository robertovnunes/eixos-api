import mongoose, { Schema, Model, Document } from 'mongoose';

export interface IBaseModel extends Document {
  createdAt?: Date;
  updatedAt?: Date;
}

export default abstract class BaseModel<T extends IBaseModel> {
  protected schema: Schema;
  protected modelName: string;
  public model: Model<T>;

  constructor(modelName: string, schemaDefinition: Record<string, any>) {
    this.modelName = modelName;
    this.schema = new Schema(
      {
        ...schemaDefinition,
        createdAt: { type: Date, default: Date.now },
        updatedAt: { type: Date, default: Date.now },
      },
      { timestamps: true },
    );

    this.model = mongoose.model<T>(modelName, this.schema);
  }
}
