import TaskEntity from '../entities/task.entity';

export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  private constructor() {
    this.data = {};
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static reset() {
    Database.instance = new Database();
  }

  static seed() {
    const db = Database.getInstance();
    db.data = {
      tasks: [
        new TaskEntity('1', 'Estudar Node.js', 'Estudar Node.js', false, 'low', '2021-09-01'),
        new TaskEntity('2', 'Estudar TypeScript', 'Estudar TypeScript', false, 'low', '2021-09-01'),
        new TaskEntity('3', 'Estudar JavaScript', 'Estudar JavaScript', false, 'low', '2021-09-01'),
      ],
    };
  }
}