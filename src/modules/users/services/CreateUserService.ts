import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/UsersRepository";
import User from "../typeorm/entities/User";


interface IRequest {

    name: string;
    email: string;
    password: string;
};
// CRIAÇÃO DE USUARIO
class CreateUserService {

    public async execute({ name, email, password }: IRequest): Promise<User> {

        const usersRepository = getCustomRepository(UsersRepository);

        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError("Email ja existe!");
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });
        
        await usersRepository.save(user);

        return user
    }
}

export default CreateUserService;