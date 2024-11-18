import BaseEntity from "./base.entity";

export default class TaskEntity extends BaseEntity {

  title: string;
  description: string;
  completed: boolean;
  priority: string;
  deadline: string;

  constructor(
    id: string, 
    title: string, 
    description: string, 
    done: boolean, 
    priority: string, 
    deadline: string
  ) {
    super(id || '');
    this.title = title;
    this.description = description;
    this.completed = done;
    this.priority = priority;
    this.deadline = deadline;
  }
}