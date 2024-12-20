import TimerEntity from '../entities/timer.entity';
import TimerRepository from '../repositories/timer.repository';

class TimerService {
  private timerRepository: TimerRepository;

  constructor(timerRepository: TimerRepository) {
    this.timerRepository = timerRepository;
  }

    /**
     * Converte um documento do Mongoose para a entidade TimerEntity.
     * @param timerModel - Documento retornado pelo Mongoose.
     * @returns Instância de TimerEntity.
     */
    private toEntity(timerModel: any): TimerEntity {
        return new TimerEntity({
            _id: timerModel._id, // Converte ObjectId para string.
            name: timerModel.name,
            focusTime: timerModel.focusTime,
            breakTime: timerModel.breakTime,
            isRunning: timerModel.isRunning,
            loops: timerModel.loops,
            longBreakTime: timerModel.longBreakTime,
        });

    }

    async getTimers(): Promise<TimerEntity[]> {
        const timers = await this.timerRepository.findAll();
        return timers.map((timer) => this.toEntity(timer));
    }

    async createTimer(data: Partial<TimerEntity>): Promise<TimerEntity> {
        const timer = await this.timerRepository.create(data);
        return this.toEntity(timer);
    }

    async getTimerById(id: string): Promise<TimerEntity | null> {
        const timer = await this.timerRepository.findById(id);
        return timer ? this.toEntity(timer) : null;
    }

    async updateTimer(
        id: string,
        data: Partial<TimerEntity>,
    ): Promise<TimerEntity | null> {
        const timer = await this.timerRepository.update(id, data);
        return timer ? this.toEntity(timer) : null;
    }

    async deleteTimer(id: string): Promise<void> {
        await this.timerRepository.delete(id);
    }
}

export default TimerService;