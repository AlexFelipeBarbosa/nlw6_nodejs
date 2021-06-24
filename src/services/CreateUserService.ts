import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  async execute({ name, admin = false, email, password }: IUserRequest) {
    const usersRepository = getCustomRepository(UsersRepositories);

    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadExists = await usersRepository.findOne({
      email,
    });

    if (userAlreadExists) {
      throw new Error("User already exists");
    }

    // Criptografando a senha do User
    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    });

    await usersRepository.save(user);

    // Não mostrar o password do usuario.
    delete user.password;

    return user;
  }
}

export { CreateUserService };
