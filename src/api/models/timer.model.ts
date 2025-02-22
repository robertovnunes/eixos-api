import BaseModel, {IBaseModel} from "./base.model";

export interface ITimerModel extends IBaseModel {
    name: string;
    focusTime: number;
    shortBreakTime: number;
    loops: number;
    longBreakTime?: number;
}

export default class TimerModel extends BaseModel<ITimerModel> {
    constructor() {
        super('Timer', {
          name: { type: String, required: true },
          focusTime: { type: Number, required: true },
          shortBreakTime: { type: Number, required: true },
          loops: { type: Number, required: true },
          longBreakTime: { type: Number, required: false },
        });
    }
}