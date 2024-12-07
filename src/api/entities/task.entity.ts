import BaseEntity from './base.entity';

interface Subtask {
  description: string;
  completed: boolean;
}

interface Priority {
  value: number;
  label: string;
}

export default class TaskEntity extends BaseEntity {
  public title: string;
  public description: string;
  public completed: boolean;
  public priority: Priority;
  public deadline: string;
  public isImportant: boolean;
  public isUrgent: boolean;
  public subtasks: Subtask[];

  constructor(data: Partial<TaskEntity>) {
    super(data);
    this.title = data.title || '';
    this.description = data.description || '';
    this.completed = data.completed || false;
    this.priority = data.priority || { value: 0, label: 'Baixa' };
    this.deadline = data.deadline || '';
    this.isImportant = data.isImportant || false;
    this.isUrgent = data.isUrgent || false;
    this.subtasks = data.subtasks || [];
  }
}
