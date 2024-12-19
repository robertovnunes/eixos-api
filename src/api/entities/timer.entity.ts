import BaseEntity from "./base.entity";

class TimerEntity extends BaseEntity {
  public name: string;
  public focusTime: number;
  public breakTime: number;
  public isRunning: boolean;
  public loops: number;
  public longBreakTime?: number;


  constructor(data: Partial<TimerEntity>) {
    super(data);
    this.name = data.name || '';
    this.focusTime = data.focusTime || 0;
    this.breakTime = data.breakTime || 0;
    this.isRunning = data.isRunning || false;
    this.loops = data.loops || 0;
    if(data.longBreakTime){
      this.longBreakTime = data.longBreakTime;
    }
  }
}