import TasksRepository from "../repositories/tasks.repository";
import TasksService from "../services/tasks.service";
import TimerRepository from "../repositories/timer.repository";
import TimerService from "../services/timer.service";
import Injector from "./injector";

export const injector = new Injector();

injector.registerRepository(TasksRepository, new TasksRepository());
injector.registerService(TasksService, new TasksService(injector.getRepository(TasksRepository)));

injector.registerRepository(TimerRepository, new TimerRepository());
injector.registerService(TimerService, new TimerService(injector.getRepository(TimerRepository)));

