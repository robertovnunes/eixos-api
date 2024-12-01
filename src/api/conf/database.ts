// src/database/mongodb-connection.ts

import mongoose from 'mongoose';
require('dotenv').config();

export default class MongoDBConnection {
  private static instance: MongoDBConnection;
  private dbUser = process.env.DB_USER;
  private dbPassword = process.env.DB_PASSWORD;
  private dbName = process.env.DATABASE;
  private connectionString = `mongodb+srv://${this.dbUser}:${this.dbPassword}@cluster0.lnlwm.mongodb.net/${this.dbName}?retryWrites=true&w=majority&appName=Cluster0`;

  private constructor() {}

  static async getInstance(): Promise<MongoDBConnection> {
    if (!MongoDBConnection.instance) {
      MongoDBConnection.instance = new MongoDBConnection(); // Corrigido
      await MongoDBConnection.instance.connect();
    }
    return MongoDBConnection.instance;
  }

  private async connect(): Promise<void> {
    try {
      await mongoose.connect(this.connectionString);
      console.log('Conectado ao MongoDB com Mongoose!');
    } catch (err) {
      console.error('Erro ao conectar ao MongoDB:', err);
      throw err;
    }
  }

  get connection() {
    return mongoose.connection;
  }
}
