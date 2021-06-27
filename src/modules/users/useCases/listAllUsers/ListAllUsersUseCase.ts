import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const findAdmin = this.usersRepository.findById(user_id);

    if (!findAdmin) {
      throw new Error("Usuário não encontrado");
    }

    if (!findAdmin.admin) {
      throw new Error("Usuário não é admin");
    }

    const users = this.usersRepository.list();

    return users;
  }
}

export { ListAllUsersUseCase };
