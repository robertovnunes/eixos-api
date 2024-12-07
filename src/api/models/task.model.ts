import BaseModel, { IBaseModel } from "./base.model";

interface Subtask {
    description: string;
    completed: boolean;
}

interface Priority {
  value: number;
  label: string;
}

export interface ITaskModel extends IBaseModel {
  title: string;
  description: string;
  completed: boolean;
  priority: Priority;
  deadline?: string;
  isImportant: boolean;
  isUrgent: boolean;
  subtasks: Subtask[];

}

export default class TaskModel extends BaseModel<ITaskModel> {
  constructor() {
    super('Task', {
      title: { type: String, required: true },
      description: { type: String, required: true },
      completed: { type: Boolean, default: false },
      priority: { type: Object, required: true },
      deadline: { type: String, required: false },
      isImportant: { type: Boolean, default: false },
      isUrgent: { type: Boolean, default: false },
      subtasks: { type: Array, default: [] }
    });
  }
}