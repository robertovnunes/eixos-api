import BaseModel, { IBaseModel } from "./base.model";
import { Types } from "mongoose";
import RoutineTaskModel from "./routineTask.model";

export interface IScheduleModel extends IBaseModel {
  _id: Types.ObjectId;
  data: Date;
  routineTasks: [RoutineTaskModel];
  completed: boolean;
}

export default class ScheduleModel extends BaseModel<IScheduleModel> {
    constructor() {
        super('Schedule', {
            _id: { type: Types.ObjectId, auto: true },
            data: { type: Date, required: true },
            routineTasks: { type: Array, required: true },
            completed: { type: Boolean, default: false },
        });
    }
}