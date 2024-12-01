import TasksRepository from "../repositories/tasks.repository";
import TasksService from "../services/tasks.service";
import Injector from "./injector";

export const injector = new Injector();

injector.registerRepository(TasksRepository, new TasksRepository());
injector.registerService(TasksService, new TasksService(injector.getRepository(TasksRepository)));

