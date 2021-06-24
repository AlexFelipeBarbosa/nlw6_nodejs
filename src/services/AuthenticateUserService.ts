import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const usersRepositories = getCustomRepository(UsersRepositories);

    // Verificar se o email existe
    const user = await usersRepositories.findOne({
      email,
    });
    if (!user) {
      throw new Error("Email/Password incorrect!");
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Email/Password incorrect!");
    }

    // Gerar o Token
    const token = sign(
      {
        email: user.email,
      },
      "896661721ead5fac595c6cfb0cc79537", // md5 generator = alexberre
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    return token;
  }
}

export { AuthenticateUserService };
