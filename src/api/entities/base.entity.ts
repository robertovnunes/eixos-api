import { Types } from "mongoose";
export default abstract class BaseEntity {
  public _id?: Types.ObjectId;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Partial<BaseEntity>) {
    Object.assign(this, data);
  }
}
