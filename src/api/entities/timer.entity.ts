import BaseEntity from "./base.entity";

class TimerEntity extends BaseEntity {
  public name: string;
  public focusTime: number;
  public breakTime: number;
  public loops: number;
  public longBreakTime?: number;


  constructor(data: Partial<TimerEntity>) {
    super(data);
    this.name = data.name || '';
    this.focusTime = data.focusTime || 0;
    this.breakTime = data.breakTime || 0;
    this.loops = data.loops || 0;
    if(data.longBreakTime){
      this.longBreakTime = data.longBreakTime;
    }
  }
}

export default TimerEntity