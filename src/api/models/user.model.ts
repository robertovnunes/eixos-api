import { ObjectId, Types } from "mongoose";
import BaseModel, { IBaseModel } from "./base.model";


interface Phone {
  ddi: string;
  ddd: string;
  number: string;
}

export interface IUserModel extends IBaseModel {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  phone?: Phone | {};
  defaultTimer?: ObjectId;
  theme?: string;
}

export default class UserModel extends BaseModel<IUserModel> {
  constructor() {
    super('User', {
        _id: { type: Types.ObjectId, auto: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        phone: { type: Object, required: false },
        defaultTimer: { type: Types.ObjectId, ref:"timers", required: false },
        theme: { type: String, required: false }
        });
    }
}