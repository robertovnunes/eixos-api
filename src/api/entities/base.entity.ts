export default abstract class BaseEntity {
  public _id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Partial<BaseEntity>) {
    Object.assign(this, data);
  }
}
