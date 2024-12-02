import BaseModel, { IBaseModel } from "./base.model";

interface Subtask {
    description: string;
    completed: boolean;
}

export interface ITaskModel extends IBaseModel {
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  deadline?: string;
  subtasks?: Subtask[];

}

export default class TaskModel extends BaseModel<ITaskModel> {
  constructor() {
    super('Task', {
      title: { type: String, required: true },
      description: { type: String, required: true },
      completed: { type: Boolean, default: false },
      priority: { type: String, required: true },
      deadline: { type: String, required: false },
      subtasks: { type: Array, required: false }
    });
  }
}