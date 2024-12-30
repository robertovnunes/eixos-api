import UserRepository from "../repositories/user.repository";
import UserEntity from "../entities/user.entity";

class UserService{
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    async getAllUsers(): Promise<UserEntity[]>{
        const users = await this.userRepository.findAll();
        return users.map(user => new UserEntity(user));
    }

    async getUserByEmail(email: string): Promise<UserEntity | null>{
        const user = await this.userRepository.findByEmail(email);
        return user ? new UserEntity(user) : null;
    }

    async getUserDefaultTimer(userId: string): Promise<string | null>{
        return this.userRepository.findDefaultTimer(userId);
    }

    async createUser(data: Partial<UserEntity>): Promise<UserEntity>{
        const user = await this.userRepository.create(data);
        return new UserEntity(user);
    }

    async getUserById(userId: string): Promise<UserEntity | null>{
        const user = await this.userRepository.findById(userId);
        return user ? new UserEntity(user) : null;
    }

    async updateUser(userId: string, data: Partial<UserEntity>): Promise<UserEntity | null>{
        const user = await this.userRepository.update(userId, data);
        return user ? new UserEntity(user) : null;
    }

    async deleteUser(userId: string): Promise<void>{
        await this.userRepository.delete(userId);
    }

}

export default UserService;