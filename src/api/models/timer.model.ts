import BaseModel, {IBaseModel} from "./base.model";

export interface ITimerModel extends IBaseModel {
    name: string;
    focusTime: number;
    breakTime: number;
    isRunning: boolean;
    loops: number;
    longBreakTime?: number;
}

export default class TimerModel extends BaseModel<ITimerModel> {
    constructor() {
        super('Timer', {
            name: { type: String, required: true },
            focusTime: { type: Number, required: true },
            breakTime: { type: Number, required: true },
            isRunning: { type: Boolean, required: true },
            loops: { type: Number, required: true },
            longBreakTime: { type: Number, required: false },
        });
    }
}