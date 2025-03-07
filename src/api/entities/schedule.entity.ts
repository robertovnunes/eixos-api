import BaseEntity from "./base.entity";
import { Types } from "mongoose";
import RoutineTaskEntity from "./routineTask.entity";

export default class ScheduleEntity extends BaseEntity {
    public data: Date;
    public routineTasks: [RoutineTaskEntity];
    public completed: boolean;

    constructor(data: Partial<ScheduleEntity>) {
        super(data);
        this.data = data.data || new Date();
        this.routineTasks = data.routineTasks || [new RoutineTaskEntity({})];
        this.completed = data.completed || false;
    }
    
}