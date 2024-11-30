import BaseEntity from "./base.entity";

export default class TaskEntity extends BaseEntity {

  title: string;
  description: string;
  completed: boolean;
  priority: string;
  deadline: string;

  constructor(
    task: TaskEntity
  ) {
    super(task.id || '');
    this.title = task.title;
    this.description = task.description;
    this.completed = task.completed;
    this.priority = task.priority;
    this.deadline = task.deadline;
  }
}