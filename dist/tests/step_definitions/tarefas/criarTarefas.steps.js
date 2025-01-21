"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jest_cucumber_1 = require("jest-cucumber");
const testConfig_1 = require("../testConfig");
const supertest_1 = __importDefault(require("supertest"));
const tasks_repository_1 = __importDefault(require("../../../src/api/repositories/tasks.repository"));
const di_1 = require("../../../src/api/di");
const cucumber_1 = require("cucumber");
const feature = (0, jest_cucumber_1.loadFeature)('./tests/features/tarefas/criarTarefas.feature');
(0, jest_cucumber_1.defineFeature)(feature, test => {
    let mockTaskRepository;
    let response = (0, supertest_1.default)(testConfig_1.app);
    beforeAll(() => {
        testConfig_1.app.listen(testConfig_1.PORT);
    });
    beforeEach(() => {
        mockTaskRepository = di_1.injector.getRepository(tasks_repository_1.default);
    });
    test('Criar uma tarefa válida via serviço', (_a) => __awaiter(void 0, [_a], void 0, function* ({ given, when, then }) {
        given(/^não existe uma tarefa com o título "(.*)"$/, (title) => __awaiter(void 0, void 0, void 0, function* () {
            const task = yield mockTaskRepository.findTasksByTitle(title);
            if (task) {
                const id = task[0]._id.toString();
                yield mockTaskRepository.delete(id);
            }
        }));
        when(/^o cliente faz a requisição "(.*)" para "(.*)" and o payload$/, (req, json) => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(req.toLowerCase()).post(json);
            console.log(response.body);
            expect(response.status).toBe(201);
        }));
    }));
});
(0, cucumber_1.Given)(/^que o serviço de gerenciamento de tarefas está disponível$/, function () {
});
