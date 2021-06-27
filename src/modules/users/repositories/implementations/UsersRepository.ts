/* eslint-disable consistent-return */
import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();
    user.name = name;
    user.email = email;
    user.admin = false;
    user.created_at = new Date();
    user.updated_at = new Date();

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (user) {
      return user;
    }
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    if (user) {
      return user;
    }
  }

  turnAdmin(receivedUser: User): User {
    const findUser = this.users.find((user) => user === receivedUser);

    findUser.admin = true;

    return findUser;
  }

  list(): User[] {
    const user = this.users;

    return user;
  }
}

export { UsersRepository };
