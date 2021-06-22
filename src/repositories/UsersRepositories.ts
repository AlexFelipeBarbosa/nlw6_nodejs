import { EntityRepository, Repository } from "typeorm";
import { Users } from "../entities/User";

@EntityRepository(Users)
class UsersRepositories extends Repository<Users> {}

export { UsersRepositories };
