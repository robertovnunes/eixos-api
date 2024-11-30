import TaskEntity from '../entities/task.entity';

export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  constructor() {
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
        new TaskEntity(
          {
            id:'1', 
            title:'Estudar Node.js', 
            description:'Estudar Node.js', 
            completed:false,
            priority:'low', 
            deadline:'2021-09-01'
          }
        ),
        new TaskEntity(
          {
            id:'2', 
            title:'Estudar TypeScript', 
            description:'Estudar TypeScript', 
            completed:false,
            priority:'low', 
            deadline:'2021-09-01'
          }
        ),
        new TaskEntity(
          {
            id:'3', 
            title:'Estudar Nest.js', 
            description:'Estudar Nest.js', 
            completed:false,
            priority:'low', 
            deadline:'2021-09-01'
          }
        ),
      ],
    };
  }
}