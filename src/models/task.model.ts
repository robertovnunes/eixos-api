import BaseModel from "./base.model";

export default class TaskModel extends BaseModel {
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  deadline: string;

  constructor(data: TaskModel) {
    super(data.id || '');
    this.title = data.title;
    this.description = data.description;
    this.completed = data.completed;
    this.priority = data.priority;
    this.deadline = data.deadline;
  }
}