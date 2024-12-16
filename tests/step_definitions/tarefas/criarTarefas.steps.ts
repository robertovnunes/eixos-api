import {defineFeature, loadFeature} from 'jest-cucumber';
import {app, request, PORT} from './../testConfig';
import TasksRepository from '../../../src/api/repositories/tasks.repository';
import TaskEntity from '../../../src/api/entities/task.entity';
import {injector} from './../../../src/api/di';
import supertest from 'supertest';

const feature = loadFeature('./tests/features/tarefas/criarTarefas.feature');

defineFeature(feature, test => {

    let mockTaskRepository: TasksRepository;
    let response: supertest.Response;

    beforeAll(() => {
        app.listen(PORT);
    });

    beforeEach(() => {
        mockTaskRepository = injector.getRepository<TasksRepository>(TasksRepository);

    });
  
    test('Criar uma tarefa válida via serviço', async ({ given, when, then }) => {
        given(
          /^não existe uma tarefa com o título "(.*)"$/,
          async (title) => {
            const task = await mockTaskRepository.findTasksByTitle(title);
            if (task) {
              await mockTaskRepository.delete(task[0]._id.toString());
            }
          },
        );

    });
});