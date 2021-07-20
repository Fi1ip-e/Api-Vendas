import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";

//LISTAR USUARIOS
class ListUserService {
    
    public async execute(): Promise<User[]> {

        const userRepository = getCustomRepository(UsersRepository);
        const user = await userRepository.find();

        return user;

    }
};

export default ListUserService;