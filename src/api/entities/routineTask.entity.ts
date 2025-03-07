import BaseEntity from "./base.entity";

export default class RoutineTask extends BaseEntity {

    public title: string;
    public description: string;
    public weekDay: [string];
    public time: string;
    public completed: boolean;
    
    constructor(data: Partial<RoutineTask>) {
        super(data);
        this.title = data.title || '';
        this.description = data.description || '';
        this.weekDay = data.weekDay || [''];
        this.time = data.time || '';
        this.completed = data.completed || false;
    }
    
}
