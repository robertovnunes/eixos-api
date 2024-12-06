import BaseEntity from './base.entity';

interface Subtask {
  description: string;
  completed: boolean;
}

export default class TaskEntity extends BaseEntity {
  public title: string;
  public description: string;
  public completed: boolean;
  public priority: string;
  public deadline?: string;
  public isImportant: boolean;
  public isUrgent: boolean;
  public subtasks: Subtask[];

  constructor(data: Partial<TaskEntity>) {
    super(data);
    this.title = data.title || '';
    this.description = data.description || '';
    this.completed = data.completed || false;
    this.priority = data.priority || '';
    this.deadline = data.deadline;
    this.isImportant = data.isImportant || false;
    this.isUrgent = data.isUrgent || false;
    this.subtasks = data.subtasks || [];
  }
}
