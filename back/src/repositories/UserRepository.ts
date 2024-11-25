import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
  findById: async function (id: number): Promise<User> {
    const user = await this.findOneBy({ id });
    if (user) return user;
    else throw Error("Invalid ID");
  },

  checkById: async function (id: number): Promise<boolean> {
    const user = await this.findById(id);
    return !!user;
  },

  updateUser: async function (
    id: number,
    userData: Partial<User>
  ): Promise<User> {
    const user = await this.findOne({ where: { id } });

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    // Update the user with the provided data
    Object.assign(user, userData);

    // Save the updated user
    return this.save(user);
  },
});

export default UserRepository;
