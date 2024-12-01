import TaskEntity from './../entities/task.entity';

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
    Database.getInstance().data = {
      tests: [
        new TaskEntity({
          id: '24ea307e-2315-4d0d-b887-c650c11e20a1',
          title: 'teste',
          description: 'qa',
          completed: false,
          priority: 'media',
          deadline: '2024-12-31',
        }),
      ],
    };
  }
}
