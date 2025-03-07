import { Types } from "mongoose";
import BaseModel, { IBaseModel } from "./base.model";

export interface IRoutineTaskModel extends IBaseModel {
  _id: Types.ObjectId;
  title: string;
  description: string;
  weekDay: [string];
  time: string;
  completed: boolean;
}

export default class RoutineTaskModel extends BaseModel<IRoutineTaskModel> {
    constructor() {
        super('Routine', {
            _id: { type: Types.ObjectId, auto: true },
            title: { type: String, required: true },
            description: { type: String, required: true },
            weekDay: { type: Array, required: true },
            time: { type: String, required: true },
            completed: { type: Boolean, default: false },
        });
    }
}