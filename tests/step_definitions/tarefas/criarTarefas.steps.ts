import {defineFeature, loadFeature} from 'jest-cucumber';
import {app, PORT} from '../testConfig';
import request from 'supertest';
import TasksRepository from '../../../src/api/repositories/tasks.repository';
import TaskEntity from '../../../src/api/entities/task.entity';
import {injector} from '../../../src/api/di';
import supertest from 'supertest';
import {Given} from "cucumber";

const feature = loadFeature('./tests/features/tarefas/criarTarefas.feature');

defineFeature(feature, test => {

    let mockTaskRepository: TasksRepository;
    let response = request(app);

    beforeAll(() => {
        app.listen(PORT);
    });

    beforeEach(() => {
        mockTaskRepository = injector.getRepository<TasksRepository>(TasksRepository);
    });
  
    test('Criar uma tarefa válida via serviço', async ({ given, when, then }) => {
        given(/^não existe uma tarefa com o título "(.*)"$/, async (title) => {
          const task = await mockTaskRepository.findTasksByTitle(title);
          if (task) {
            const id = task[0]._id.toString();
            await mockTaskRepository.delete(id);
          }
        });
        when(/^o cliente faz a requisição "(.*)" para "(.*)" and o payload$/, async (req, json) => {
            const response = await request(req.toLowerCase()).post(json);
            console.log(response.body);
            expect(response.status).toBe(201);
        });
    });
});
Given(/^que o serviço de gerenciamento de tarefas está disponível$/, function () {

});