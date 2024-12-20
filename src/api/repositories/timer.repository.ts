import BaseRepository from "./base.repository";
import TimerModel, {ITimerModel} from "../models/timer.model";

export default class TimerRepository extends BaseRepository<ITimerModel> {
    
    constructor() {
        const timerModel = new TimerModel().model;
        super(timerModel);
    }

}