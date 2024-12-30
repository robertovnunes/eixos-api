import BaseEntity from "./base.entity";

class TimerEntity extends BaseEntity {
  public name: string;
  public focusTime: number;
  public shortBreakTime: number;
  public loops: number;
  public longBreakTime?: number;


  constructor(data: Partial<TimerEntity>) {
    super(data);
    this.name = data.name || '';
    this.focusTime = data.focusTime || 0;
    this.shortBreakTime = data.shortBreakTime || 0;
    this.loops = data.loops || 1;
    if(data.longBreakTime){
      this.longBreakTime = data.longBreakTime;
    }
  }
}

export default TimerEntity