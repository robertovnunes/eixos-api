import BaseEntity from './base.entity';

export default class TaskEntity extends BaseEntity {
  public title: string;
  public description: string;
  public completed: boolean;
  public priority: string;
  public deadline?: string;

  constructor(data: Partial<TaskEntity>) {
    super(data);
    this.title = data.title || '';
    this.description = data.description || '';
    this.completed = data.completed || false;
    this.priority = data.priority || '';
    this.deadline = data.deadline;
  }
}
